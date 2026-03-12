"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

interface SignupLayoutProps {
  children: React.ReactNode;
  showVisual?: boolean;
}

export function SignupLayout({ children, showVisual = true }: SignupLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation - Responsive */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BrandName
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Log in
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Visual (optional) */}
        {showVisual && (
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="h-full relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 max-w-lg"
                >
                  <h1 className="text-4xl font-bold">
                    Join thousands of teams using BrandName
                  </h1>
                  <p className="text-xl text-white/80">
                    The all-in-one platform for modern teams to collaborate, innovate, and grow.
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <div>
                      <div className="text-2xl font-bold">10k+</div>
                      <div className="text-sm text-white/60">Active users</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-white/60">Companies</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-white/60">Support</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Form */}
        <div className={`
          flex-1 flex items-center justify-center 
          px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16
          ${showVisual ? 'lg:w-1/2' : 'w-full'}
        `}>
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>

      {/* Footer - Responsive */}
      <footer className="border-t border-gray-100 bg-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              © 2024 BrandName. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 order-1 sm:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>

            {/* Footer Links */}
            <div className="flex space-x-4 sm:space-x-6 order-3">
              <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-900">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Import Button component
import { Button } from './ui/button';