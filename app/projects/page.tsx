'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Github, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'

const categories = ['All', 'Web Development', 'UI/UX Design', 'Business Analysis', 'Digital Marketing']

export default function Projects() {
  const router = useRouter()
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
      <section className="py-12 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="metallic-text">Our</span> Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent max-w-3xl mx-auto">
              Showcasing our latest work and innovative solutions across various industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-primary border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile/Tablet: Dropdown Filter */}
          <div className="block lg:hidden">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="h-5 w-5 text-accent" />
              <span className="text-accent font-medium">Filter by category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-gray-200/20 rounded-xl text-white focus:border-blue-400 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800 text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: Button Filter */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-4">
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
            <>
              {/* Modern Card Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary border border-accent/20 rounded-xl shadow-lg hover:shadow-xl hover:border-accent/40 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="relative h-52 bg-accent/5 overflow-hidden">
                      {(project.imageUrl || project.image || project.coverImage) ? (
                        <CldImage 
                          src={project.imageUrl || project.image || project.coverImage} 
                          alt={project.title}
                          width={400}
                          height={208}
                          crop={{ type: 'fit' }}
                          quality="auto"
                          format="auto"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-accent/40 text-sm">No Preview Available</span>
                        </div>
                      )}
                      
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-neon text-primary px-3 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary/80 text-neon text-xs px-2 py-1 rounded-full border border-neon/30">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-secondary">
                        {project.title}
                      </h3>
                      
                      <p className="text-accent/70 text-sm leading-relaxed">
                        {project.description?.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {project.technologies && project.technologies.slice(0, 3).map((tech: string) => (
                          <span 
                            key={tech} 
                            className="text-xs bg-accent/5 text-accent/80 px-2 py-1 rounded-md border border-accent/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="text-xs text-accent/50 px-2 py-1">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                      
                      <div className="pt-2 border-t border-accent/10">
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <Button 
                              variant="neon" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => window.open(project.liveUrl, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Demo
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1 border border-accent/20 hover:bg-accent/5"
                            onClick={() => router.push(`/projects/${project.id}`)}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Have a <span className="metallic-text">Project</span> in Mind?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-accent mb-8 px-4">
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