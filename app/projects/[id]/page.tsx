'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, ExternalLink, Github, Calendar, Building2, Tag, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
      <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button 
              onClick={() => router.push('/projects')} 
              className="inline-flex items-center text-accent hover:text-secondary transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </button>
            
            {/* Vertical Layout */}
            <div className="space-y-8">
              {/* Image Section */}
              <div>
                <div className="w-full bg-accent/5 rounded-lg overflow-hidden border border-accent/20">
                  {currentImage ? (
                    <CldImage 
                      src={currentImage} 
                      alt={project.title}
                      width={1200}
                      height={800}
                      crop={{ type: 'fit' }}
                      quality="auto"
                      format="auto"
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <span className="text-accent/60 text-sm">No image available</span>
                    </div>
                  )}
                </div>
                
                {allImages.length > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={prevImage}
                      className="flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>
                    <span className="text-accent/80 text-sm">
                      {currentImageIndex + 1} of {allImages.length}
                    </span>
                    <button
                      onClick={nextImage}
                      className="flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="bg-accent/5 rounded-lg border border-accent/10 p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Header */}
                  <div className="text-center border-b border-accent/10 pb-6">
                    <span className="inline-block text-xs text-neon font-medium bg-neon/10 px-3 py-1 rounded border border-neon/20 mb-4">
                      {project.category}
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
                      {project.title}
                    </h1>
                    <p className="text-accent/80 text-lg leading-relaxed max-w-2xl mx-auto">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Info Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-secondary mb-4">Project Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-accent">
                          <Calendar className="h-4 w-4 mr-3 text-neon" />
                          <span className="text-sm">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-accent">
                          <Building2 className="h-4 w-4 mr-3 text-neon" />
                          <span className="text-sm">Client: Veliora TechWorks</span>
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-secondary mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.map((tech: string) => (
                          <span key={tech} className="text-sm bg-accent/10 text-accent px-3 py-2 rounded border border-accent/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-accent/10">
                    {project.liveUrl && project.liveUrl.trim() && (
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="neon" size="lg" className="w-full sm:w-auto px-8">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live Demo
                        </Button>
                      </Link>
                    )}
                    {project.githubUrl && project.githubUrl.trim() && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                          <Github className="h-4 w-4 mr-2" />
                          View Source Code
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}