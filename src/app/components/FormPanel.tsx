"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StepProgress } from './StepProgress'
import { PersonalInfoStep } from './PersonalInfoStep'
import { CompanyInfoStep } from './CompanyInfoStep'
import { AccountCreationStep } from './AccountCreationStep'
import { SuccessStep } from './SuccessStep'
import { projectId, publicAnonKey } from '../utils/supabase/info'

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
  const [error, setError] = useState<string>('')

  const totalSteps = 4

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setError('') // Clear error when user updates form
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      setError('') // Clear error when going back
    }
  }

  const handleSignup = async () => {
    // Double-check password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      console.log('Sending signup request...')
      console.log('Form data:', {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        jobTitle: formData.jobTitle
      })
      
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
          company: formData.company,
          jobTitle: formData.jobTitle
        })
      })

      const data = await response.json()
      console.log('Response status:', response.status)
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || `Signup failed with status ${response.status}`)
      }

      console.log('Signup successful:', data)
      nextStep() // Go to success page
      
    } catch (err) {
      console.error('Signup error details:', err)
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.')
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
            onNext={handleSignup}  // Ito ang mahalaga!
            onBack={prevStep}
            isLoading={isLoading}
            error={error}
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Join us today</h2>
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