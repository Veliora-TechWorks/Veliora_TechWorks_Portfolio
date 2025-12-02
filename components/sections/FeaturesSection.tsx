'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Palette, Cloud, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Intuitive and beautiful user experiences',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast, optimized applications',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security implementations',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="metallic-text">Premium</span> Solutions
          </h2>
          <p className="text-xl text-accent max-w-3xl mx-auto">
            Cutting-edge technology services designed for the future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:neon-glow transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-metallic-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                {feature.title}
              </h3>
              <p className="text-accent">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}