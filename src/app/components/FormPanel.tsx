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
    setError('')
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

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
          company: formData.company,
          jobTitle: formData.jobTitle
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Signup failed`)
      }

      nextStep()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
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
            onNext={handleSignup}
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
    <div className="w-full max-w-[400px] lg:max-w-[440px] mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Join us today
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Create your account and start your journey
        </p>
      </div>

      {/* Progress */}
      {currentStep < totalSteps && (
        <div className="mb-6 sm:mb-8">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps - 1} />
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-400">
        Already have an account?{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Sign in
        </a>
      </p>
    </div>
  )
}