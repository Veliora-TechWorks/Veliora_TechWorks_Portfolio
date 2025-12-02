'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Github, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const categories = ['All', 'Web Development', 'UI/UX Design', 'Business Analysis', 'Digital Marketing']

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [projects, setProjects] = useState<any[]>([])
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      console.log('Fetched projects:', data) // Debug log
      setProjects(data)
      setFilteredProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === category))
    }
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="metallic-text">Our</span> Projects
            </h1>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Showcasing our latest work and innovative solutions across various industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-primary border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Filter className="h-5 w-5 text-accent" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'neon' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-secondary mb-4">No Projects Yet</h3>
              <p className="text-accent">Projects will appear here once added by the admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl overflow-hidden hover:neon-glow transition-all duration-300 group"
              >
                <div className="relative h-48 bg-gray-800">
                  <div className="absolute inset-0 bg-metallic-gradient opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-accent text-sm">Project Image</span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-neon-gradient text-primary px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-neon font-semibold">{project.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-secondary group-hover:text-neon transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-accent mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies && project.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="neon" size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Have a <span className="metallic-text">Project</span> in Mind?
            </h2>
            <p className="text-xl text-accent mb-8">
              Let's collaborate and bring your vision to life with our expertise
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