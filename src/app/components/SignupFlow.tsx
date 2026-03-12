"use client"

import { useState } from 'react'
import { VisualPanel } from './VisualPanel'
import { FormPanel } from './FormPanel'

export function SignupFlow() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual Storytelling */}
      <div className="hidden lg:flex lg:w-1/2">
        <VisualPanel />
      </div>
      
      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <FormPanel />
      </div>
    </div>
  )
}