"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Chrome, Apple } from 'lucide-react'

export function SocialLoginButtons() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="h-10 sm:h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        onClick={() => setIsGoogleLoading(true)}
        disabled={isGoogleLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        <span className="text-sm sm:text-base">Google</span>
      </Button>
      <Button
        variant="outline"
        className="h-10 sm:h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        onClick={() => setIsAppleLoading(true)}
        disabled={isAppleLoading}
      >
        <Apple className="mr-2 h-4 w-4" />
        <span className="text-sm sm:text-base">Apple</span>
      </Button>
    </div>
  )
}