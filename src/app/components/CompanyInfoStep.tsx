"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ArrowRight, ArrowLeft, Building2, Briefcase } from 'lucide-react'
import type { FormData } from './FormPanel'

interface CompanyInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function CompanyInfoStep({ formData, updateFormData, onNext, onBack }: CompanyInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
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
          About your work
        </h3>
        <p className="text-sm text-gray-500">
          Help us personalize your experience
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Company name
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateFormData({ company: e.target.value })}
              className={`pl-9 h-10 sm:h-11 ${errors.company ? 'border-red-300' : ''}`}
              placeholder="Acme Inc."
            />
          </div>
          {errors.company && (
            <p className="text-red-500 text-xs">{errors.company}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="jobTitle" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Job title <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => updateFormData({ jobTitle: e.target.value })}
              className="pl-9 h-10 sm:h-11"
              placeholder="Product Manager"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Responsive */}
      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="w-full sm:flex-1 h-10 sm:h-11 border-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          className="w-full sm:flex-1 h-10 sm:h-11 bg-indigo-600 hover:bg-indigo-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}