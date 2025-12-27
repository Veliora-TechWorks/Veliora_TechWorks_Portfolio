'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Target, Lightbulb, Users } from 'lucide-react'
import { InteractiveTimeline } from '@/components/sections/InteractiveTimeline'

const expertise = [
  {
    category: 'Web Development',
    description: 'Full-stack web applications with modern frameworks and scalable architecture',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    proficiency: 95,
    projects: '15+ Projects',
    icon: '🌐'
  },
  {
    category: 'UI/UX Design',
    description: 'User-centered design solutions that enhance engagement and conversion',
    technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    proficiency: 88,
    projects: '12+ Projects',
    icon: '🎨'
  },
  {
    category: 'Business Analysis',
    description: 'Strategic insights and data-driven solutions for business optimization',
    technologies: ['Analytics', 'KPI Tracking', 'Process Optimization', 'Reporting'],
    proficiency: 90,
    projects: '8+ Projects',
    icon: '📊'
  },
  {
    category: 'Digital Strategy',
    description: 'Comprehensive digital transformation and growth strategies',
    technologies: ['SEO', 'Content Strategy', 'Brand Development', 'Market Analysis'],
    proficiency: 85,
    projects: '10+ Projects',
    icon: '🚀'
  }
]

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="metallic-text">About</span> Veliora
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent max-w-3xl mx-auto">
              We are a premium technology company dedicated to pushing the boundaries of digital innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Story</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Welcome to Veliora TechWorks, a modern technology studio dedicated to building digital products that inspire, engage, and empower. We combine creativity, engineering, and strategy to deliver solutions that help individuals, startups, and businesses grow in the digital era.
              </p>
              <p className="text-gray-400 leading-relaxed">
                At Veliora TechWorks, our focus is simple: turn ideas into meaningful digital experiences.Whether it’s a website, a full-stack platform, a brand identity, or a custom software solution — we design and develop with precision, innovation, and purpose.
              </p>
            </div>
          </motion.div>

          {/* Mission, Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To empower individuals and organizations through technology by creating products that are modern, efficient, and built for long-term success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To become a trusted digital partner for businesses worldwide by delivering innovative, reliable, and impactful technology solutions.
              </p>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10 mb-12"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Values</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Innovation',
                'Excellence', 
                'Integrity',
                'Client Success',
                'Collaboration',
                'Continuous Learning'
              ].map((value) => (
                <div key={value} className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                  {value}
                </div>
              ))}
            </div>
          </motion.div>


        </div>
      </section>

      {/* Professional Expertise Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="metallic-text">Our</span> Expertise
            </h2>
            <p className="text-accent text-lg max-w-3xl mx-auto">
              Delivering excellence across multiple domains with proven expertise and measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8 hover:border-neon/30 transition-all duration-300 lg:block hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-1">{item.category}</h3>
                      <p className="text-neon text-sm font-medium">{item.projects}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary">{item.proficiency}%</div>
                    <div className="text-xs text-accent">Proficiency</div>
                  </div>
                </div>
                
                <p className="text-accent mb-6 leading-relaxed">{item.description}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-accent">Expertise Level</span>
                    <span className="text-sm text-neon font-medium">{item.proficiency}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.proficiency}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-neon to-purple h-2 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-secondary mb-3">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-neon/10 text-neon border border-neon/20 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 border-l-4 border-neon"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.icon}</div>
                    <h3 className="text-lg font-bold text-secondary">{item.category}</h3>
                  </div>
                  <div className="bg-neon/10 px-3 py-1 rounded-full">
                    <span className="text-neon text-sm font-bold">{item.proficiency}%</span>
                  </div>
                </div>
                
                <p className="text-accent text-sm mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-accent">{item.projects}</span>
                  <div className="w-24 bg-white/10 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.proficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="bg-neon h-1.5 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-white/5 text-accent rounded-md border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs text-neon">+{item.technologies.length - 3}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <InteractiveTimeline />
    </div>
  )
}