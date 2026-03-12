import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className="relative">
                <motion.div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    isCompleted
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : isCurrent
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-gray-300 text-gray-400 bg-white'
                  }`}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{stepNumber}</span>
                  )}
                </motion.div>
              </div>
              
              {index < totalSteps - 1 && (
                <motion.div
                  className={`w-16 h-0.5 mx-2 ${
                    stepNumber < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                  initial={false}
                  animate={{
                    backgroundColor: stepNumber < currentStep ? '#4f46e5' : '#d1d5db'
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  )
}