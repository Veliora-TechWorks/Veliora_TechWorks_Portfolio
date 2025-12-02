'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Target, Lightbulb, Users } from 'lucide-react'
import { InteractiveTimeline } from '@/components/sections/InteractiveTimeline'

const skills = [
  { name: 'Frontend Development', level: 95 },
  { name: 'Backend Development', level: 90 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Business Analytics', level: 88 },
  { name: 'Digital Marketing', level: 82 },
]

const timeline = [
  { year: '2019', title: 'Company Founded', description: 'Started with a vision to innovate' },
  { year: '2020', title: 'First Major Client', description: 'Delivered enterprise solution' },
  { year: '2021', title: 'Team Expansion', description: 'Grew to 10+ specialists' },
  { year: '2022', title: 'Cloud Expertise', description: 'Became AWS certified partner' },
  { year: '2023', title: 'AI Integration', description: 'Added AI/ML capabilities' },
  { year: '2024', title: 'Global Reach', description: 'Serving clients worldwide' },
]

export default function About() {
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
              <span className="metallic-text">About</span> Veliora
            </h1>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              We are a premium technology company dedicated to pushing the boundaries of digital innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8 text-center"
            >
              <Target className="h-12 w-12 text-neon mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 metallic-text">Mission</h3>
              <p className="text-accent">
                To deliver cutting-edge technology solutions that transform businesses and exceed expectations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8 text-center"
            >
              <Lightbulb className="h-12 w-12 text-neon mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 metallic-text">Vision</h3>
              <p className="text-accent">
                To be the leading force in technological innovation, shaping the future of digital experiences
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8 text-center"
            >
              <Users className="h-12 w-12 text-neon mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 metallic-text">Values</h3>
              <p className="text-accent">
                Innovation, excellence, integrity, and client success drive everything we do
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              <span className="metallic-text">Our</span> Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-secondary font-medium">{skill.name}</span>
                  <span className="text-accent">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-neon-gradient h-2 rounded-full"
                  />
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