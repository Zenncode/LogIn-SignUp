"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ArrowRight, Mail, User, Building2 } from 'lucide-react'
import { SocialLoginButtons } from './SocialLoginButtons'
import type { FormData } from './FormPanel'

interface PersonalInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function PersonalInfoStep({ formData, updateFormData, onNext }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5 sm:space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Let's get started
        </h3>
        <p className="text-sm text-gray-500">
          Tell us about yourself
        </p>
      </div>

      {/* Social Login */}
      <SocialLoginButtons />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs font-medium text-gray-400 bg-white">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name Fields - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              First name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className={`pl-9 h-10 sm:h-11 ${errors.firstName ? 'border-red-300' : ''}`}
                placeholder="John"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className={`pl-9 h-10 sm:h-11 ${errors.lastName ? 'border-red-300' : ''}`}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className={`pl-9 h-10 sm:h-11 ${errors.email ? 'border-red-300' : ''}`}
              placeholder="john@company.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Company Field - Optional */}
        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Company <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateFormData({ company: e.target.value })}
              className="pl-9 h-10 sm:h-11"
              placeholder="Acme Inc."
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button 
        onClick={handleNext} 
        className="w-full h-10 sm:h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Terms */}
      <p className="text-xs text-center text-gray-400">
        By joining, you agree to our{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Privacy Policy
        </a>
      </p>
    </motion.div>
  )
}