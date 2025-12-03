'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone, Cloud, Shield } from 'lucide-react'

const techStack = [
  { icon: Code, name: 'Frontend', techs: ['React', 'Next.js', 'TypeScript'] },
  { icon: Database, name: 'Backend', techs: ['Node.js', 'Python', 'PostgreSQL'] },
  { icon: Globe, name: 'Web', techs: ['HTML5', 'CSS3', 'JavaScript'] },
  { icon: Smartphone, name: 'Mobile', techs: ['Coming Soon'], comingSoon: true },
  { icon: Cloud, name: 'Cloud', techs: ['Coming Soon'], comingSoon: true },
  { icon: Shield, name: 'Security', techs: ['Coming Soon'], comingSoon: true },
]

export function TechStackSection() {
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
            <span className="metallic-text">Tech</span> Arsenal
          </h2>
          <p className="text-accent text-lg max-w-2xl mx-auto">
            Cutting-edge technologies powering next-generation solutions
          </p>
        </motion.div>

        {/* Mobile: Enhanced Card View */}
        <div className="block md:hidden space-y-6">
          {techStack.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                category.comingSoon ? 'border-accent/10 opacity-70' : 'border-accent/10 hover:border-neon/30'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner ${
                  category.comingSoon ? 'bg-accent/10' : 'bg-gradient-to-br from-neon/20 to-accent/20'
                }`}>
                  <category.icon className={`w-7 h-7 ${
                    category.comingSoon ? 'text-accent/60' : 'text-neon'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary mb-3">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          category.comingSoon 
                            ? 'bg-accent/5 text-accent/60 border-accent/10' 
                            : 'bg-neon/10 text-neon border-neon/20'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tablet/Desktop: Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`glass p-6 rounded-lg border group cursor-pointer ${
                category.comingSoon ? 'border-accent/10 opacity-60' : 'border-accent/20'
              }`}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-metallic-gradient rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg"
              >
                <category.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-secondary mb-3">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                    viewport={{ once: true }}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      category.comingSoon 
                        ? 'bg-accent/5 text-accent/60 border-accent/10' 
                        : 'bg-accent/10 text-accent border-accent/20'
                    }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}