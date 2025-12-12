'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight, Building2 } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-dark-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-neon/3 opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Professional Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-lg flex items-center justify-center">
            <Image 
              src="/Logo.png" 
              alt="Veliora TechWorks" 
              width={160} 
              height={160} 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" 
              priority
            />
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="metallic-text">Veliora</span>
            <br />
            <span className="text-secondary">TechWorks</span>
          </h1>
        </motion.div>

        {/* Professional Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl text-accent font-light mb-6 max-w-4xl mx-auto">
            Enterprise Technology Solutions
          </h2>
          <p className="text-base sm:text-lg text-accent/80 max-w-3xl mx-auto leading-relaxed">
            Delivering cutting-edge software development, cloud infrastructure, and digital transformation services for forward-thinking organizations.
          </p>
        </motion.div>

        {/* Professional CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto"
        >
          <Link href="/projects">
            <Button variant="neon" size="lg" className="w-full sm:w-auto px-8 py-4 text-base font-medium">
              View Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-base font-medium border-accent/30 hover:border-accent">
              <Building2 className="mr-2 h-4 w-4" />
              Discuss Your Project
            </Button>
          </Link>
        </motion.div>


      </div>
    </section>
  )
}