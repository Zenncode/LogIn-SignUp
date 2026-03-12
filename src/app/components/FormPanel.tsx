"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StepProgress } from './StepProgress'
import { PersonalInfoStep } from './PersonalInfoStep'
import { CompanyInfoStep } from './CompanyInfoStep'
import { AccountCreationStep } from './AccountCreationStep'
import { SuccessStep } from './SuccessStep'

export type FormData = {
  firstName: string
  lastName: string
  email: string
  company: string
  jobTitle: string
  password: string
  confirmPassword: string
}

export function FormPanel() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = 4

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      nextStep()
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <CompanyInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 3:
        return (
          <AccountCreationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleSubmit}
            onBack={prevStep}
            isLoading={isLoading}
          />
        )
      case 4:
        return <SuccessStep />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl mb-2">Join us today</h2>
        <p className="text-gray-600">Create your account and start your journey</p>
      </div>

      {currentStep < totalSteps && (
        <StepProgress currentStep={currentStep} totalSteps={totalSteps - 1} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}