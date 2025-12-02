'use client'

import { motion } from 'framer-motion'
import { Calendar, Zap, Target, Rocket } from 'lucide-react'

const milestones = [
  {
    year: '2025',
    title: 'Foundation',
    description: 'Veliora TechWorks was born with a vision to innovate beyond boundaries',
    icon: Calendar,
    progress: 100,
    achievements: ['Company Established', 'Core Team Formed', 'Vision Defined']
  },
  {
    year: '2025',
    title: 'First Success',
    description: 'Delivered 5+ premium projects with 100% client satisfaction',
    icon: Zap,
    progress: 100,
    achievements: ['5+ Projects Delivered', '100% Client Satisfaction', 'Tech Stack Mastered']
  },
  /*{
    year: '2025',
    title: 'Expansion',
    description: 'Scaled operations and enhanced service offerings across multiple domains',
    icon: Target,
    progress: 75,
    achievements: ['Service Expansion', 'Team Growth', 'Market Presence']
  },
  {
    year: '2025',
    title: 'Future Vision',
    description: 'Leading the next wave of digital transformation and innovation',
    icon: Rocket,
    progress: 25,
    achievements: ['AI Integration', 'Global Reach', 'Industry Leadership']
  }*/
]

export function InteractiveTimeline() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-neon to-accent bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-accent text-lg max-w-2xl mx-auto">
            From vision to reality - witness our evolution through innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Progress Circle */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(192, 192, 192, 0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: milestone.progress / 100 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      strokeDasharray: "0 1"
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E0FF" />
                      <stop offset="100%" stopColor="#C0C0C0" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon to-accent rounded-xl flex items-center justify-center">
                    <milestone.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="text-sm font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-neon to-accent text-primary">
                    {milestone.progress}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="text-accent text-sm font-medium">{milestone.year}</div>
                <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                <p className="text-accent text-sm leading-relaxed">{milestone.description}</p>
                
                <div className="space-y-2">
                  {milestone.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center justify-center text-xs text-accent">
                      <div className="w-1 h-1 bg-neon rounded-full mr-2"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}