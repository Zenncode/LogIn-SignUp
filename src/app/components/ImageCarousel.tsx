import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    tagline: 'Connect with your team',
    description: 'Seamlessly collaborate with colleagues from anywhere in the world'
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
    tagline: 'Boost your productivity',
    description: 'Streamline your workflow with powerful tools and integrations'
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    tagline: 'Achieve your goals',
    description: 'Turn your ideas into reality with our comprehensive platform'
  }
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={slides[currentSlide].image}
              alt="Carousel background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold">
              {slides[currentSlide].tagline}
            </h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-md">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex space-x-2 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}