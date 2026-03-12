"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
    tagline: 'Connect with your team',
    description: 'Seamlessly collaborate with colleagues from anywhere in the world'
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop',
    tagline: 'Boost your productivity',
    description: 'Streamline your workflow with powerful tools and integrations'
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop',
    tagline: 'Achieve your goals',
    description: 'Turn your ideas into reality with our comprehensive platform'
  }
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].tagline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2 sm:space-y-3 md:space-y-4 max-w-lg"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              {slides[currentSlide].tagline}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Hidden on mobile, show on hover on desktop */}
        <div className="hidden sm:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group/indicator"
            >
              <div className={`
                h-1 rounded-full transition-all duration-300
                ${index === currentSlide 
                  ? 'w-6 sm:w-8 bg-white' 
                  : 'w-4 sm:w-6 bg-white/40 hover:bg-white/60'
                }
              `} />
            </button>
          ))}
          
          {/* Auto-play indicator */}
          <span className="ml-auto text-xs text-white/60 hidden sm:block">
            {isAutoPlaying ? 'Auto' : 'Paused'}
          </span>
        </div>

        {/* Mobile Touch Navigation Hint */}
        <div className="sm:hidden absolute inset-x-0 bottom-20 text-center">
          <p className="text-xs text-white/60">
            Swipe to navigate
          </p>
        </div>
      </div>

      {/* Touch handlers for mobile */}
      <div className="absolute inset-0 sm:hidden flex">
        <div className="w-1/3 h-full" onClick={prevSlide} />
        <div className="w-1/3 h-full" onClick={() => setIsAutoPlaying(!isAutoPlaying)} />
        <div className="w-1/3 h-full" onClick={nextSlide} />
      </div>
    </div>
  );
}