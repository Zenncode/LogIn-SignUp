import { Hono } from 'https://deno.land/x/hono@v3.12.11/mod.ts'
import { cors } from 'https://deno.land/x/hono@v3.12.11/middleware/cors/index.ts'
import { logger } from 'https://deno.land/x/hono@v3.12.11/middleware/logger/index.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as kv from './kv_store.ts'

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));

app.use('*', logger(console.log));

// Initialize Supabase admin client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// ==================== HEALTH CHECK ====================
// SIMPLIFIED PATH - remove the prefix
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'auth-server'
  });
});

// ==================== SIGNUP ENDPOINT ====================
app.post('/signup', async (c) => {
  try {
    const { email, password, firstName, lastName, company } = await c.req.json();

    // Validation
    if (!email || !password || !firstName || !lastName) {
      console.log('Signup validation error: Missing required fields');
      return c.json({ error: 'Missing required fields' }, 400);
    }

    console.log(`Creating user account for email: ${email}`);

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        first_name: firstName,
        last_name: lastName,
        company: company || '',
        full_name: `${firstName} ${lastName}`
      },
      email_confirm: true // Auto-confirm email
    });

    if (error) {
      console.log('Supabase signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    console.log('User created successfully:', data.user?.id);

    // Store additional user data in KV store
    if (data.user) {
      await kv.set(`user:${data.user.id}`, {
        email,
        firstName,
        lastName,
        company: company || '',
        createdAt: new Date().toISOString(),
        userId: data.user.id
      });
    }

    return c.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        firstName,
        lastName,
        company: company || ''
      }
    });

  } catch (error) {
    console.log('Server error during signup:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// ==================== GET USER SESSION ====================
app.get('/me', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log('Auth error getting user:', error);
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Get additional data from KV store
    const kvData = await kv.get(`user:${user.id}`) || {};

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.user_metadata?.first_name || kvData.firstName,
        lastName: user.user_metadata?.last_name || kvData.lastName,
        company: user.user_metadata?.company || kvData.company,
        fullName: user.user_metadata?.full_name || `${kvData.firstName || ''} ${kvData.lastName || ''}`.trim(),
        createdAt: kvData.createdAt,
        metadata: user.user_metadata
      }
    });

  } catch (error) {
    console.log('Server error getting user info:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== GET USER BY ID (Admin only) ====================
app.get('/user/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    
    // Get user from Auth
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId);
    
    if (error || !user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Get KV data
    const kvData = await kv.get(`user:${userId}`) || {};

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.user_metadata?.first_name || kvData.firstName,
        lastName: user.user_metadata?.last_name || kvData.lastName,
        company: user.user_metadata?.company || kvData.company,
        createdAt: user.created_at,
        lastSignIn: user.last_sign_in_at,
        kvData
      }
    });

  } catch (error) {
    console.log('Error getting user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== UPDATE USER ====================
app.put('/user/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    const updates = await c.req.json();
    
    // Update in KV store
    const existing = await kv.get(`user:${userId}`) || {};
    await kv.set(`user:${userId}`, { ...existing, ...updates, updatedAt: new Date().toISOString() });

    // Update metadata in Auth if needed
    if (updates.firstName || updates.lastName || updates.company) {
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          ...existing,
          first_name: updates.firstName || existing.firstName,
          last_name: updates.lastName || existing.lastName,
          company: updates.company || existing.company,
          full_name: `${updates.firstName || existing.firstName} ${updates.lastName || existing.lastName}`.trim()
        }
      });
    }

    return c.json({ success: true, message: 'User updated successfully' });

  } catch (error) {
    console.log('Error updating user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== DELETE USER ====================
app.delete('/user/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    
    // Delete from Auth
    await supabase.auth.admin.deleteUser(userId);
    
    // Delete from KV store
    await kv.del(`user:${userId}`);

    return c.json({ success: true, message: 'User deleted successfully' });

  } catch (error) {
    console.log('Error deleting user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== LIST USERS (with pagination) ====================
app.get('/users', async (c) => {
  try {
    const limit = Number(c.req.query('limit')) || 10;
    const offset = Number(c.req.query('offset')) || 0;
    
    // Get from KV store by prefix
    const users = await kv.getByPrefix('user:');
    
    // Paginate
    const paginated = users.slice(offset, offset + limit);
    
    return c.json({
      users: paginated,
      total: users.length,
      limit,
      offset
    });

  } catch (error) {
    console.log('Error listing users:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== KV STORE DIRECT ACCESS ====================
app.post('/kv/set', async (c) => {
  try {
    const { key, value } = await c.req.json();
    await kv.set(key, value);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/kv/get/:key', async (c) => {
  try {
    const key = c.req.param('key');
    const value = await kv.get(key);
    return c.json({ key, value });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.delete('/kv/del/:key', async (c) => {
  try {
    const key = c.req.param('key');
    await kv.del(key);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Start server
Deno.serve(app.fetch);