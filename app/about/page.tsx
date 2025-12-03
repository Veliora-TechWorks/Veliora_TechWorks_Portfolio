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
  { year: '2025', title: 'Company Founded', description: 'Started with a vision to innovate' },
  { year: '2025', title: 'First Major Client', description: 'Delivered enterprise solution' },
  /*{ year: '2021', title: 'Team Expansion', description: 'Grew to 10+ specialists' },
  { year: '2022', title: 'Cloud Expertise', description: 'Became AWS certified partner' },
  { year: '2023', title: 'AI Integration', description: 'Added AI/ML capabilities' },
  { year: '2024', title: 'Global Reach', description: 'Serving clients worldwide' },*/
]

const getSkillTags = (skillName: string) => {
  const tags: { [key: string]: string[] } = {
    'Frontend Development': ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    'Backend Development': ['Node.js', 'Python', 'APIs', 'Databases'],
    'UI/UX Design': ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    'Business Analytics': ['Data Analysis', 'KPIs', 'Reporting', 'Strategy'],
    'Digital Marketing': ['SEO', 'Social Media', 'Content', 'Analytics']
  }
  return tags[skillName] || []
}

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="metallic-text">About</span> Veliora
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent max-w-3xl mx-auto px-4">
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Our Expertise
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine technical excellence with creative innovation to deliver outstanding results
            </p>
          </motion.div>

          {/* Skills Section - Unified Layout */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="text-blue-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getSkillTags(skill.name).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
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