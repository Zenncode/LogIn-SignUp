"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import type { FormData } from './FormPanel'

interface CompanyInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function CompanyInfoStep({ formData, updateFormData, onNext, onBack }: CompanyInfoStepProps) {
  const handleNext = () => {
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl mb-2">About your work</h3>
        <p className="text-gray-600">Help us personalize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="company">Company name</Label>
          <Input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => updateFormData({ company: e.target.value })}
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <Label htmlFor="jobTitle">Job title</Label>
          <Input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={(e) => updateFormData({ jobTitle: e.target.value })}
            placeholder="Product Manager"
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}