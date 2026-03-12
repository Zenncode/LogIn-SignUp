"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ArrowRight } from 'lucide-react'
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl mb-2">Let's get started</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <SocialLoginButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className={errors.firstName ? 'border-red-500' : ''}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className={errors.lastName ? 'border-red-500' : ''}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={errors.email ? 'border-red-500' : ''}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <Button onClick={handleNext} className="w-full" size="lg">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}