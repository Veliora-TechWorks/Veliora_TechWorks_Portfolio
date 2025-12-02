export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  status: 'new' | 'read' | 'replied'
}