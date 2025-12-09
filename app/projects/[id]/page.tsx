'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'

export default function ProjectDetails() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const allImages = useMemo(() => {
    if (!project) return []
    const images = []
    // Include main image first, then additional images
    if (project.imageUrl) images.push(project.imageUrl)
    if (project.image) images.push(project.image)
    if (project.images && project.images.length > 0) {
      images.push(...project.images)
    }
    return Array.from(new Set(images.filter(Boolean)))
  }, [project])

  const coverImage = useMemo(() => {
    if (!project) return null
    // Use main project image as cover
    return project.imageUrl || project.image || null
  }, [project])

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])

  useEffect(() => {
    // Preload all images
    if (typeof window !== 'undefined') {
      allImages.forEach((src) => {
        try {
          const img = new Image()
          img.src = src.replace('/upload/', '/upload/w_800,h_450,c_fill/')
        } catch (error) {
          console.warn('Failed to preload image:', src)
        }
      })
    }
  }, [allImages])

  const currentImage = allImages.length > 0 ? allImages[currentImageIndex] : coverImage

  const nextImage = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }
  }

  const prevImage = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  const fetchProject = async () => {
    try {
      console.log('Fetching project with ID:', params.id)
      const response = await fetch(`/api/projects/${params.id}`)
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Project data:', data)
        setProject(data)
      } else {
        const error = await response.json()
        console.error('Error response:', error)
        setProject(null)
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
      setProject(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-dark-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-accent">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="pt-16 min-h-screen bg-dark-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Project Not Found</h1>
          <Button variant="neon" onClick={() => router.push('/projects')}>Back to Projects</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-dark-gradient">
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
          <button className="absolute top-6 right-6 bg-gradient-to-r from-neon to-purple text-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-30" onClick={() => setIsFullscreen(false)}>
            <X className="h-5 w-5" />
          </button>
          {allImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon to-purple text-primary p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-20">
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon to-purple text-primary p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-20">
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          <CldImage src={currentImage} alt={project.title} width={1920} height={1080} crop={{ type: 'fit' }} quality="auto" format="auto" className="w-full h-full object-contain" />
        </div>
      )}
      <section className="py-16 bg-primary relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/2 via-transparent to-gray-300/2" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button 
              onClick={() => router.push('/projects')} 
              className="inline-flex items-center text-accent hover:text-neon transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </button>
            
            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-row gap-8">
              <div className="lg:w-1/2">
                <motion.div 
                  className="w-full min-h-[320px] max-h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden relative shadow-2xl border border-gray-200/10 flex items-center justify-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentImage ? (
                    <CldImage 
                      src={currentImage} 
                      alt={project.title}
                      width={1200}
                      height={800}
                      crop={{ type: 'fit' }}
                      quality="auto"
                      format="auto"
                      loading="eager"
                      className="w-full h-auto max-h-[700px] object-contain cursor-pointer"
                      onClick={() => setIsFullscreen(true)}
                      onError={(e) => {
                        console.error('Image failed to load:', currentImage)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-purple/20 opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-accent text-lg font-semibold">Project Image</span>
                      </div>
                    </>
                  )}
                  
                  {allImages.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon to-purple text-primary p-3 rounded-full shadow-lg shadow-neon/50 border border-white/20 z-20"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </motion.button>
                      <motion.button
                        onClick={nextImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon to-purple text-primary p-3 rounded-full shadow-lg shadow-neon/50 border border-white/20 z-20"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </motion.button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold border border-neon/30 shadow-lg z-20">
                        {currentImageIndex + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-neon to-purple text-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      ★ Featured
                    </div>
                  )}
                </motion.div>
                
                {allImages.length > 1 && (
                  <div className="flex gap-3 mt-6 overflow-x-auto pb-2 px-1">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                          index === currentImageIndex ? 'border-neon shadow-neon/50 ring-2 ring-neon/30' : 'border-gray-600/50 hover:border-neon/50'
                        }`}
                      >
                        <CldImage 
                          src={img} 
                          alt={`${project.title} ${index + 1}`}
                          width={80}
                          height={64}
                          crop={{ type: 'fill' }}
                          quality="auto"
                          format="auto"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-neon font-bold bg-gradient-to-r from-neon/20 to-purple/20 px-3 py-1 rounded-full border border-neon/30">
                      {project.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {project.title}
                  </h1>
                  
                  <p className="text-accent/90 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-accent">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-accent">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">Client: Veliora TechWorks</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <Tag className="h-4 w-4 mr-2 text-accent" />
                      <span className="text-secondary font-semibold">Technologies Used</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies && project.technologies.map((tech: string) => (
                        <span key={tech} className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl && project.liveUrl.trim() && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="neon" size="lg" className="bg-gradient-to-r from-neon to-neon/80">
                            <ExternalLink className="h-5 w-5 mr-2" />
                            View Live Project
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                    {project.githubUrl && project.githubUrl.trim() && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="lg" className="border-accent/30 hover:border-neon/50">
                            <Github className="h-5 w-5 mr-2" />
                            View Source Code
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              {/* Image Section */}
              <motion.div 
                className="w-full min-h-[300px] max-h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden relative shadow-2xl border border-gray-200/10 mb-8 flex items-center justify-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {currentImage ? (
                  <CldImage 
                    src={currentImage} 
                    alt={project.title}
                    width={1200}
                    height={800}
                    crop={{ type: 'fit' }}
                    quality="auto"
                    format="auto"
                    loading="eager"
                    className="w-full h-auto max-h-[600px] object-contain cursor-pointer"
                    onClick={() => setIsFullscreen(true)}
                    onError={(e) => {
                      console.error('Image failed to load:', currentImage)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-purple/20 opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-accent text-lg font-semibold">Project Image</span>
                    </div>
                  </>
                )}
                
                {allImages.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon to-purple text-primary p-3 rounded-full shadow-lg shadow-neon/50 border border-white/20 z-20"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </motion.button>
                    <motion.button
                      onClick={nextImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon to-purple text-primary p-3 rounded-full shadow-lg shadow-neon/50 border border-white/20 z-20"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </motion.button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold border border-neon/30 shadow-lg z-20">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
                
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-neon to-purple text-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ★ Featured
                  </div>
                )}
              </motion.div>
              
              {allImages.length > 1 && (
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                        index === currentImageIndex ? 'border-neon shadow-neon/50 ring-2 ring-neon/30' : 'border-gray-600/50 hover:border-neon/50'
                      }`}
                    >
                      <CldImage 
                        src={img} 
                        alt={`${project.title} ${index + 1}`}
                        width={64}
                        height={48}
                        crop={{ type: 'fill' }}
                        quality="auto"
                        format="auto"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-neon font-bold bg-gradient-to-r from-neon/20 to-purple/20 px-3 py-1 rounded-full border border-neon/30">
                    {project.category}
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                
                <p className="text-accent/90 text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-accent">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-accent">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">Client: Veliora TechWorks</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 mr-2 text-accent" />
                    <span className="text-secondary font-semibold">Technologies Used</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies && project.technologies.map((tech: string) => (
                      <span key={tech} className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {project.liveUrl && project.liveUrl.trim() && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="neon" size="lg" className="w-full bg-gradient-to-r from-neon to-neon/80">
                          <ExternalLink className="h-5 w-5 mr-2" />
                          View Live Project
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                  {project.githubUrl && project.githubUrl.trim() && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" size="lg" className="w-full border-accent/30 hover:border-neon/50">
                          <Github className="h-5 w-5 mr-2" />
                          View Source Code
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}