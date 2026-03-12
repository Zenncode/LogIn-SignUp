import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, Chrome, Apple } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { SuccessPage } from './SuccessPage';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
}

export function SignupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = [
    { title: 'Personal Information', fields: ['firstName', 'lastName'] },
    { title: 'Account Details', fields: ['email', 'password', 'confirmPassword'] },
    { title: 'Company Information', fields: ['company'] }
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleNext = () => currentStep < totalSteps - 1 && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 0 && setCurrentStep(prev => prev - 1);

  // Add this missing function
  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`${provider} authentication failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd01f22b/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      setShowSuccess(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => formData[field as keyof FormData].trim() !== '');
  };

  if (showSuccess) {
    return <SuccessPage userEmail={formData.email} onContinue={() => setShowSuccess(false)} />;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Join thousands of users</p>
      </div>

      {/* Progress */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-gray-500">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Social Login - First step only */}
      {currentStep === 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            variant="outline" 
            className="h-11" 
            onClick={() => handleSocialLogin('google')} 
            disabled={isLoading}
          >
            <Chrome className="w-4 h-4 mr-2" /> Google
          </Button>
          <Button 
            variant="outline" 
            className="h-11" 
            onClick={() => handleSocialLogin('apple')} 
            disabled={isLoading}
          >
            <Apple className="w-4 h-4 mr-2" /> Apple
          </Button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              {steps[currentStep].title}
            </h3>

            {/* Step 0 - Personal Information */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 1 - Account Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2 - Company Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentStep === 0 || isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button 
              onClick={handleNext} 
              disabled={!isStepValid() || isLoading}
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isStepValid() || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          )}
        </div>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-gray-400 mt-6">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms</a>{' '}
        and{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
      </p>
    </div>
  );
}