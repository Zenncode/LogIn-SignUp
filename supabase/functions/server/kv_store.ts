import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'

const client = () => createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Set stores a key-value pair in the database.
export const set = async (key: string, value: any): Promise<void> => {
  const supabase = client()
  const { error } = await supabase.from("kv_store_dd01f22b").upsert({
    key,
    value
  });
  if (error) {
    throw new Error(error.message);
  }
};

// Get retrieves a key-value pair from the database.
export const get = async (key: string): Promise<any> => {
  const supabase = client()
  const { data, error } = await supabase
    .from("kv_store_dd01f22b")
    .select("value")
    .eq("key", key)
    .maybeSingle();
    
  if (error) {
    throw new Error(error.message);
  }
  return data?.value;
};

// Delete deletes a key-value pair from the database.
export const del = async (key: string): Promise<void> => {
  const supabase = client()
  const { error } = await supabase
    .from("kv_store_dd01f22b")
    .delete()
    .eq("key", key);
    
  if (error) {
    throw new Error(error.message);
  }
};

// Sets multiple key-value pairs in the database.
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  const supabase = client()
  const { error } = await supabase
    .from("kv_store_dd01f22b")
    .upsert(keys.map((k, i) => ({ key: k, value: values[i] })));
    
  if (error) {
    throw new Error(error.message);
  }
};

// Gets multiple key-value pairs from the database.
export const mget = async (keys: string[]): Promise<any[]> => {
  const supabase = client()
  const { data, error } = await supabase
    .from("kv_store_dd01f22b")
    .select("value")
    .in("key", keys);
    
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d: { value: any }) => d.value) ?? [];
};

// Deletes multiple key-value pairs from the database.
export const mdel = async (keys: string[]): Promise<void> => {
  const supabase = client()
  const { error } = await supabase
    .from("kv_store_dd01f22b")
    .delete()
    .in("key", keys);
    
  if (error) {
    throw new Error(error.message);
  }
};

// Search for key-value pairs by prefix.
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const supabase = client()
  const { data, error } = await supabase
    .from("kv_store_dd01f22b")
    .select("key, value")
    .like("key", prefix + "%");
    
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d: { value: any }) => d.value) ?? [];
};

// Check if key exists
export const exists = async (key: string): Promise<boolean> => {
  const supabase = client()
  const { data, error } = await supabase
    .from("kv_store_dd01f22b")
    .select("key")
    .eq("key", key)
    .maybeSingle();
    
  if (error) {
    throw new Error(error.message);
  }
  return !!data;
};

// Get all keys
export const getAllKeys = async (): Promise<string[]> => {
  const supabase = client()
  const { data, error } = await supabase
    .from("kv_store_dd01f22b")
    .select("key");
    
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d: { key: string }) => d.key) ?? [];
};

// Clear all data (use with caution!)
export const clear = async (): Promise<void> => {
  const supabase = client()
  const { error } = await supabase
    .from("kv_store_dd01f22b")
    .delete()
    .neq("key", ""); // Delete all
  
  if (error) {
    throw new Error(error.message);
  }
};