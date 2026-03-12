"use client"

import { useState, useEffect } from 'react'
import { VisualPanel } from './VisualPanel'
import { FormPanel } from './FormPanel'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

export function SignupFlow() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className={`
        lg:hidden fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 px-4 py-3
        ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span className="text-lg font-semibold text-indigo-600">
              BrandName
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Spacer */}
      <div className="lg:hidden h-16" />

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel */}
        <div className={`
          fixed lg:relative inset-0 z-40 
          transition-transform duration-500 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:flex lg:w-1/2
        `}>
          <VisualPanel />
          {isMobileMenuOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-20 right-4 z-50 lg:hidden bg-white/10 backdrop-blur-md text-white rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Right Panel */}
        <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center px-4 py-8 lg:py-0">
          <FormPanel />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}