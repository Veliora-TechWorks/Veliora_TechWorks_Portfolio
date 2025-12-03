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

        {/* Mobile: Enhanced Card View */}
        <div className="block md:hidden space-y-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl border border-accent/10 hover:border-neon/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-neon/20 to-purple/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <card.icon className="w-7 h-7 text-neon" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-accent/90 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tablet/Desktop: Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: card.delay }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="glass p-6 rounded-lg border border-accent/20 relative overflow-hidden">
                <div className="w-12 h-12 bg-metallic-gradient rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-neon transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-accent group-hover:text-secondary transition-colors">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}