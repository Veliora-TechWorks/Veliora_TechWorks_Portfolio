'use client'

import { motion } from 'framer-motion'
import { Code, Palette, BarChart3, Megaphone, Smartphone, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const iconMap: { [key: string]: any } = {
  Code,
  Palette,
  BarChart3,
  Megaphone,
  Smartphone,
  TrendingUp,
  Design: Palette,
  Analytics: BarChart3
}

export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const activeServices = services.filter(service => service.status === 'active')
  const comingSoonServices = services.filter(service => service.status === 'coming-soon')

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-dark-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-accent">Loading services...</p>
        </div>
      </div>
    )
  }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="metallic-text">Premium</span> Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent max-w-3xl mx-auto px-4">
              Comprehensive technology solutions designed to elevate your business to the next level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Services - Mobile/Tablet: Card Layout */}
          <div className="block lg:hidden space-y-6 px-4">
            {activeServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-neon/30 to-purple/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg border border-neon/20">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-accent/90 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-secondary mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features?.map((feature: string) => (
                            <span key={feature} className="px-3 py-1 text-xs rounded-full bg-neon/10 text-neon border border-neon/20">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link href="/contact">
                        <Button className="w-full mt-2 bg-gradient-to-r from-neon to-purple hover:from-neon/80 hover:to-purple/80 text-primary font-semibold">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            
            {/* Coming Soon Services */}
            {comingSoonServices.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-secondary mb-6 text-center">Coming Soon</h3>
                {comingSoonServices.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Code
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="glass rounded-xl p-6 border border-accent/10 opacity-60 mb-4"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-7 w-7 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-secondary">
                              {service.title}
                            </h3>
                            <span className="text-sm bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">
                              Coming Soon
                            </span>
                          </div>
                          <p className="text-accent/70 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6">
              {activeServices.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Code
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-neon/50 hover:shadow-2xl transition-all duration-300 group h-full flex flex-col hover:transform hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-neon/30 to-purple/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg border border-neon/20">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-secondary mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-accent mb-4 flex-grow text-sm">
                      {service.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-secondary mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {service.features?.map((feature: string) => (
                          <li key={feature} className="text-xs text-accent flex items-center">
                            <div className="w-1 h-1 bg-neon rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <Link href="/contact">
                        <Button className="w-full text-sm bg-gradient-to-r from-neon to-purple hover:from-neon/80 hover:to-purple/80 text-primary font-semibold">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Coming Soon Services - Desktop */}
            {comingSoonServices.length > 0 && (
              <div className="mt-16">
                <h3 className="text-3xl font-bold text-secondary mb-8 text-center">Coming Soon</h3>
                <div className="grid grid-cols-4 gap-6">
                  {comingSoonServices.map((service, index) => {
                    const IconComponent = iconMap[service.icon] || Code
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="glass rounded-xl p-6 opacity-60 h-full flex flex-col"
                      >
                        <div className="w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="h-6 w-6 text-gray-400" />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-lg font-semibold text-secondary">
                            {service.title}
                          </h3>
                          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">
                            Soon
                          </span>
                        </div>
                        
                        <p className="text-accent/70 text-sm flex-grow">
                          {service.description}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/2 via-transparent to-gray-300/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Process
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A proven methodology that ensures exceptional results every time
            </p>
          </motion.div>

          {/* Mobile/Tablet: Card-based Process */}
          <div className="block lg:hidden space-y-6">
            {[
              { 
                step: '01', 
                title: 'Discovery', 
                description: 'Understanding your needs and goals through comprehensive research',
                icon: '🔍',
                highlights: ['Business Analysis', 'Requirements Gathering', 'Market Research']
              },
              { 
                step: '02', 
                title: 'Strategy', 
                description: 'Creating a detailed roadmap and technical architecture',
                icon: '📋',
                highlights: ['Project Planning', 'Technical Design', 'Resource Allocation']
              },
              { 
                step: '03', 
                title: 'Development', 
                description: 'Building with modern technologies and best practices',
                icon: '⚡',
                highlights: ['Code Implementation', 'Quality Assurance', 'Testing']
              },
              { 
                step: '04', 
                title: 'Launch', 
                description: 'Deploying and optimizing for peak performance',
                icon: '🚀',
                highlights: ['Deployment', 'Performance Optimization', 'Support']
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10 hover:border-gray-200/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-blue-400 font-bold text-sm bg-blue-400/10 px-2 py-1 rounded-full">{item.step}</span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span key={highlight} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600/30">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Horizontal Cards */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-8">
              {[
                { 
                  step: '01', 
                  title: 'Discovery', 
                  description: 'Understanding your needs and goals through comprehensive research',
                  icon: '🔍'
                },
                { 
                  step: '02', 
                  title: 'Strategy', 
                  description: 'Creating a detailed roadmap and technical architecture',
                  icon: '📋'
                },
                { 
                  step: '03', 
                  title: 'Development', 
                  description: 'Building with modern technologies and best practices',
                  icon: '⚡'
                },
                { 
                  step: '04', 
                  title: 'Launch', 
                  description: 'Deploying and optimizing for peak performance',
                  icon: '🚀'
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10 hover:border-gray-200/20 transition-all duration-300 h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-600/50 transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to <span className="metallic-text">Transform</span> Your Business?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-accent mb-8 px-4">
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