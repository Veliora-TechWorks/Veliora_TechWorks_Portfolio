'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Users, Award, Zap } from 'lucide-react'

const cards = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Cutting-edge solutions that push boundaries',
    delay: 0
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our primary mission',
    delay: 0.2
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Premium standards in every deliverable',
    delay: 0.4
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Rapid development without compromising quality',
    delay: 0.6
  }
]

export function FloatingCards() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="metallic-text">Veliora</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: card.delay,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -20,
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="glass p-8 rounded-2xl border border-accent/20 h-full relative overflow-hidden">
                {/* Floating background effect */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-neon/10 to-accent/10 rounded-full blur-xl"
                />
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-metallic-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl"
                >
                  <card.icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-neon transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-accent group-hover:text-secondary transition-colors">
                  {card.description}
                </p>

                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-neon/5 to-accent/5 rounded-2xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}