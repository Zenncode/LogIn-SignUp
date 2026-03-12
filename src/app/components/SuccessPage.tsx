import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessPageProps {
  userEmail: string;
  onContinue: () => void;
}

export function SuccessPage({ userEmail, onContinue }: SuccessPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Welcome aboard!</h2>
        <p className="text-gray-600">
          Your account has been created successfully.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-left">
        <p className="text-sm text-gray-600">Account created for:</p>
        <p className="font-semibold text-gray-900">{userEmail}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          You can now access all features of our platform. Start exploring and make the most of your new account!
        </p>
        
        <Button onClick={onContinue} className="w-full flex items-center justify-center">
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}