'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Innovating Beyond Boundaries'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-dark-gradient">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-neon/5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Advanced Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <motion.div 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-lg flex items-center justify-center"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.6 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/Logo.png" alt="Veliora TechWorks" width={192} height={192} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48" />
          </motion.div>
        </motion.div>

        {/* Mobile/Tablet Enhanced Text */}
        <div className="block md:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
          >
            <div className="metallic-text mb-2">Veliora</div>
            <div className="text-secondary">TechWorks</div>
          </motion.div>
        </div>

        {/* Desktop Text Animation */}
        <div className="hidden md:block text-5xl lg:text-7xl font-bold mb-8">
          {'Veliora'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className="inline-block metallic-text"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {char}
            </motion.span>
          ))}
          <br />
          {'TechWorks'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              className="inline-block text-secondary"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Typing Animation Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-10 md:mb-12"
        >
          <div className="text-lg sm:text-xl md:text-2xl text-accent mb-4 md:mb-6 max-w-3xl mx-auto h-6 sm:h-7 md:h-8">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-base sm:text-lg text-accent/80 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Premium technology solutions crafted with precision, innovation, and futuristic design
          </motion.p>
        </motion.div>

        {/* Mobile/Tablet Button Layout */}
        <div className="block md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-4 px-4"
          >
            <Link href="/projects" className="block">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button variant="neon" size="lg" className="w-full h-14 text-lg font-semibold">
                  <span>View Our Work</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact" className="block">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button variant="outline" size="lg" className="w-full h-14 text-lg font-semibold border-2">
                  <Sparkles className="mr-2 h-5 w-5" />
                  <span>Start Project</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Desktop Button Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="hidden md:flex gap-6 justify-center items-center"
        >
          <Link href="/projects">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button variant="neon" size="lg" className="group relative">
                View Our Work
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>
          <Link href="/contact">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                rotate: [0, 1, -1, 0]
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button variant="outline" size="lg" className="group">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="mr-2"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Start Project
              </Button>
            </motion.div>
          </Link>
        </motion.div>


      </div>
    </section>
  )
}