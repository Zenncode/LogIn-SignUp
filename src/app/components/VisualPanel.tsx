"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion' 
import { ImageWithFallback } from './figma/ImageWithFallback'

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Connect with your team",
    subtitle: "Collaborate seamlessly with powerful tools designed for modern teams"
  },
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Boost productivity",
    subtitle: "Streamline your workflow and achieve more with intelligent automation"
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Grow your business",
    subtitle: "Scale faster with insights and tools that adapt to your needs"
  }
]

export function VisualPanel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col">
      {/* Image Carousel */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={carouselItems[currentSlide].image}
              alt={carouselItems[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl">
              {carouselItems[currentSlide].title}
            </h1>
            <p className="text-xl text-white/90 max-w-md">
              {carouselItems[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex space-x-2 mt-8">
          {carouselItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'w-6 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}