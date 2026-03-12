import { motion } from 'framer-motion'
import { Check, Lock, User, Building2 } from 'lucide-react'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const steps = [
    { icon: User, label: 'Personal' },
    { icon: Building2, label: 'Company' },
    { icon: Lock, label: 'Security' }
  ]

  return (
    <div className="w-full">
      {/* Desktop Progress */}
      <div className="hidden sm:block">
        <div className="relative flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            
            return (
              <div key={stepNumber} className="flex items-center flex-1 last:flex-none">
                <div className="relative flex flex-col items-center">
                  <motion.div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-200
                      ${isCompleted 
                        ? 'bg-indigo-600 text-white' 
                        : isCurrent
                        ? 'bg-white border-2 border-indigo-600 text-indigo-600'
                        : 'bg-gray-100 text-gray-400'
                      }
                    `}
                    animate={isCurrent ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </motion.div>
                  <span className={`
                    absolute -bottom-6 text-xs font-medium whitespace-nowrap
                    ${isCompleted || isCurrent ? 'text-indigo-600' : 'text-gray-400'}
                  `}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="flex-1 h-0.5 mx-2"
                    initial={false}
                    animate={{
                      backgroundColor: stepNumber < currentStep ? '#4f46e5' : '#e5e7eb'
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Progress - Simplified */}
      <div className="sm:hidden text-center">
        <div className="flex justify-center gap-2 mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${index + 1 < currentStep 
                  ? 'bg-indigo-600 w-4' 
                  : index + 1 === currentStep
                  ? 'bg-indigo-600 w-6'
                  : 'bg-gray-200'
                }
              `}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Step {currentStep} of {totalSteps}: <span className="font-medium text-indigo-600">
            {steps[currentStep - 1]?.label}
          </span>
        </p>
      </div>
    </div>
  )
}