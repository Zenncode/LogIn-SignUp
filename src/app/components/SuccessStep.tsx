import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { CheckCircle, ArrowRight } from 'lucide-react'

export function SuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-5 sm:space-y-6 py-4 sm:py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto" />
      </motion.div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Welcome aboard! 🎉
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Your account has been created successfully
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <Button 
          className="w-full h-10 sm:h-11 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => window.location.href = '/dashboard'}
        >
          Go to dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-xs text-gray-400">
          Check your email for confirmation
        </p>
      </motion.div>
    </motion.div>
  )
}