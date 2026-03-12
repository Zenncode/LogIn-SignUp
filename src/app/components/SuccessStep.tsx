import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { CheckCircle, ArrowRight } from 'lucide-react'

export function SuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      </motion.div>

      <div>
        <h3 className="text-2xl mb-2">Welcome aboard! 🎉</h3>
        <p className="text-gray-600">
          Your account has been created successfully. Let's get you started on your journey.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => window.location.href = '/dashboard'}
        >
          Get started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="text-sm text-gray-500">
          Check your email for a confirmation link
        </div>
      </motion.div>
    </motion.div>
  )
}