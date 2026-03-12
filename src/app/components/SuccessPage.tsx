import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles, Mail, Shield, Zap, Clock, Users, Star } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessPageProps {
  userEmail: string;
  onContinue: () => void;
}

export function SuccessPage({ userEmail, onContinue }: SuccessPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 sm:py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header with Confetti Effect */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-8 sm:p-10 md:p-12 text-white text-center overflow-hidden">
            {/* Animated Background Dots */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute inset-0"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </motion.div>

            {/* Check Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10 mb-6"
            >
              <div className="inline-flex p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            >
              Welcome aboard! 🎉
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative z-10 text-sm sm:text-base md:text-lg text-white/80 max-w-md mx-auto"
            >
              Your account has been created successfully. Get ready for an amazing journey!
            </motion.p>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            {/* Email Confirmation Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                    Confirmation email sent
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    We've sent a verification link to{' '}
                    <span className="font-medium text-indigo-600">{userEmail}</span>
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs sm:text-sm border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => window.location.href = `mailto:${userEmail}`}
                >
                  Open Mail
                </Button>
              </div>
            </motion.div>

            {/* What's Next Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2" />
                What's next?
              </h2>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">Secure your account</h3>
                    <p className="text-xs text-gray-500">Enable 2FA for extra security</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">Invite team members</h3>
                    <p className="text-xs text-gray-500">Collaborate with your team</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">Complete your profile</h3>
                    <p className="text-xs text-gray-500">Add your photo and details</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">Take a quick tour</h3>
                    <p className="text-xs text-gray-500">Learn the basics in 2 minutes</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-50 rounded-xl p-4 sm:p-6"
            >
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">10k+</div>
                  <div className="text-xs text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">500+</div>
                  <div className="text-xs text-gray-500">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">24/7</div>
                  <div className="text-xs text-gray-500">Support</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="text-xs text-gray-500">4.9 Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button 
                onClick={onContinue}
                className="flex-1 h-11 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/tour'}
                className="flex-1 h-11 sm:h-12 border-gray-200 text-sm sm:text-base"
              >
                Take a Tour
              </Button>
            </motion.div>

            {/* Help Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center text-xs text-gray-400"
            >
              Need help?{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Contact support
              </a>
            </motion.p>
          </div>
        </motion.div>

        {/* Related Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center space-x-4"
        >
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Documentation</a>
          <span className="text-xs text-gray-300">•</span>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Community</a>
          <span className="text-xs text-gray-300">•</span>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Blog</a>
        </motion.div>
      </div>
    </motion.div>
  );
}