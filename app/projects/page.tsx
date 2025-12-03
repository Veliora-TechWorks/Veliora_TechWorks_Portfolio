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
      <section className="py-20 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="metallic-text">Our</span> Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent max-w-3xl mx-auto px-4">
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
              {/* Mobile/Tablet: Vertical Card Layout */}
              <div className="block lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200/10 hover:border-gray-200/20 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                  >
                    {/* Subtle background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-100/5 to-gray-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    

                    
                    {/* Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      {(project.imageUrl || project.image || project.coverImage) && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                        <CldImage 
                          src={project.imageUrl || project.image || project.coverImage} 
                          alt={project.title}
                          width={400}
                          height={192}
                          crop={{ type: 'fill' }}
                          quality="auto"
                          format="auto"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-gray-300/20 opacity-30" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-lg font-semibold">Project Image</span>
                          </div>
                        </>
                      )}
                      
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ★ Featured
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-blue-400 font-semibold bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                          {project.category}
                        </span>
                      </div>
                        
                      <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-gray-200 transition-colors duration-200">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-4 text-sm line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies && project.technologies.slice(0, 3).map((tech: string) => (
                          <span 
                            key={tech} 
                            className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="text-xs text-gray-400">+{project.technologies.length - 3} more</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                        {project.liveUrl && (
                          <Button variant="neon" size="sm" className="flex-1 text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-gray-600/30 hover:border-gray-500/50">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full bg-gray-800/50 hover:bg-gray-700/70 border border-gray-200/20 hover:border-gray-200/40 text-white text-xs"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Enhanced Grid Layout */}
              <div className="hidden lg:grid grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group relative border border-gray-200/10 hover:border-gray-200/20"
                  >
                    {/* Enhanced Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      {(project.imageUrl || project.image || project.coverImage) && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                        <CldImage 
                          src={project.imageUrl || project.image || project.coverImage} 
                          alt={project.title}
                          width={400}
                          height={224}
                          crop={{ type: 'fill' }}
                          quality="auto"
                          format="auto"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-neon/20 to-purple/20 opacity-30"
                            animate={{ 
                              background: [
                                "linear-gradient(to bottom right, rgba(0, 224, 255, 0.2), rgba(138, 138, 255, 0.2))",
                                "linear-gradient(to bottom right, rgba(138, 138, 255, 0.2), rgba(0, 224, 255, 0.2))",
                                "linear-gradient(to bottom right, rgba(0, 224, 255, 0.2), rgba(138, 138, 255, 0.2))"
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span 
                              className="text-accent text-sm font-semibold"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Project Image
                            </motion.span>
                          </div>
                        </>
                      )}
                      
                      {project.featured && (
                        <motion.div 
                          className="absolute top-4 right-4 bg-gradient-to-r from-neon to-purple text-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ★ Featured
                        </motion.div>
                      )}
                      

                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <motion.span 
                          className="text-xs text-neon font-bold bg-gradient-to-r from-neon/20 to-purple/20 px-3 py-1 rounded-full border border-neon/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.category}
                        </motion.span>
                      </div>
                      
                      <motion.h3 
                        className="text-lg font-semibold mb-3 text-white group-hover:text-gray-200 transition-colors duration-200"
                        whileHover={{ x: 2 }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <p className="text-accent mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies && project.technologies.map((tech: string, techIndex: number) => (
                          <motion.span 
                            key={tech} 
                            className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full border border-accent/20 hover:border-neon/30 hover:bg-neon/10 hover:text-neon transition-all duration-300"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="flex gap-3 mb-4">
                        {project.liveUrl && (
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="neon" size="sm" className="w-full text-xs bg-gradient-to-r from-neon to-neon/80 hover:from-neon/90 hover:to-neon/70">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Live
                            </Button>
                          </motion.div>
                        )}
                        {project.githubUrl && (
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" size="sm" className="w-full text-xs border-accent/30 hover:border-neon/50 hover:bg-neon/5">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </Button>
                          </motion.div>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-xs bg-gray-800/50 hover:bg-gray-700/70 border border-gray-200/20 hover:border-gray-200/40 text-white"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        View Details
                      </Button>
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