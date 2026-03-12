"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import type { FormData } from './FormPanel'

interface AccountCreationStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
  isLoading: boolean
  error?: string
}

export function AccountCreationStep({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack, 
  isLoading,
  error 
}: AccountCreationStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onNext() // Call the parent's handleSignup
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure your account</h3>
        <p className="text-gray-600">Create a strong password</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => {
                updateFormData({ password: e.target.value })
                setErrors(prev => ({ ...prev, password: '' }))
              }}
              className={errors.password ? 'border-red-500' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => {
                updateFormData({ confirmPassword: e.target.value })
                setErrors(prev => ({ ...prev, confirmPassword: '' }))
              }}
              className={errors.confirmPassword ? 'border-red-500' : ''}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {(error || errors.submit) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{error || errors.submit}</p>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </div>

      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex-1" 
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
    </motion.div>
  )
}