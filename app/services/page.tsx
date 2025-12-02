'use client'

import { motion } from 'framer-motion'
import { Code, Palette, BarChart3, Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies like Next.js, React, and TypeScript.',
    features: ['Responsive Design', 'SEO Optimized', 'Performance Focused', 'Modern Frameworks'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Intuitive and beautiful user experiences that convert visitors into customers.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    icon: BarChart3,
    title: 'Business Analysis',
    description: 'Data-driven insights and strategic analysis to optimize your business processes and growth.',
    features: ['Market Research', 'Process Optimization', 'Data Analytics', 'Strategic Planning'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
    features: ['SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting'],
  },
]

export default function Services() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="metallic-text">Premium</span> Services
            </h1>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Comprehensive technology solutions designed to elevate your business to the next level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:neon-glow transition-all duration-300 group h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-metallic-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  {service.title}
                </h3>
                
                <p className="text-accent mb-4 flex-grow">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-secondary mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-accent flex items-center">
                        <div className="w-1 h-1 bg-neon rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              <span className="metallic-text">Our</span> Process
            </h2>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              A streamlined approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
              { step: '02', title: 'Strategy', description: 'Creating a comprehensive plan' },
              { step: '03', title: 'Development', description: 'Building with precision and care' },
              { step: '04', title: 'Launch', description: 'Deploying and optimizing' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-metallic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">{item.title}</h3>
                <p className="text-accent">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="metallic-text">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-accent mb-8">
              Let's discuss your project and create something extraordinary together
            </p>
            <Button variant="neon" size="lg">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}