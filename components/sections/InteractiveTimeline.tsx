'use client'

import { motion } from 'framer-motion'
import { Calendar, Zap, Target, Rocket, Building } from 'lucide-react'

const milestones = [
  {
  year: '2025',
  title: 'Establishing & Expanding',
  description: 'Veliora TechWorks is strengthening its foundation while expanding services, capabilities, and market reach to support a wider range of digital transformation needs.',
  icon: Building,
  color: 'from-yellow-500 to-lime-500',
  achievements: [
    'Stronger Market Presence',
    'Service Expansion',
    'Team Development',
    'New Partnerships'
  ]
}
]

export function InteractiveTimeline() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/2 via-transparent to-gray-300/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From vision to reality - witness our evolution through innovation and dedication
          </p>
        </motion.div>

        {/* Mobile/Tablet: Vertical Timeline */}
        <div className="block lg:hidden">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline Node */}
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-xl flex items-center justify-center shadow-lg relative z-10`}>
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-400 font-semibold text-sm">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{milestone.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{milestone.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {milestone.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal Cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10 hover:border-gray-200/20 transition-all duration-300 h-full">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <span className="text-blue-400 font-semibold text-sm">{milestone.year}</span>
                    <h3 className="text-lg font-semibold mb-3 text-white mt-2">{milestone.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{milestone.description}</p>
                    
                    <div className="space-y-2">
                      {milestone.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center justify-center text-xs text-gray-300">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}