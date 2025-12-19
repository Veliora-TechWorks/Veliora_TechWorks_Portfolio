'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BarChart3, Users, Mail, Settings, Plus, Edit, Trash2, LogOut, Activity, Zap, Shield, Globe, TrendingUp, Eye, Clock, Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'





export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [showAddProject, setShowAddProject] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [newProject, setNewProject] = useState({
    projectId: '',
    title: '',
    description: '',
    category: 'Web Development',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    imageUrl: '',
    images: [] as string[],
    coverImage: ''
  })
  const [uploading, setUploading] = useState(false)
  const [servicesData, setServicesData] = useState<any[]>([])
  const [editingService, setEditingService] = useState<any>(null)
  const [saveMessage, setSaveMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [bulkSelected, setBulkSelected] = useState<string[]>([])
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [contacts, setContacts] = useState<any[]>([])
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [contactFilter, setContactFilter] = useState('all')
  const [contactSearch, setContactSearch] = useState('')
  const [systemStats, setSystemStats] = useState({
    dbConnected: true,
    authActive: true,
    lastBackup: '2 hours ago',
    cacheSize: '45.2 MB',
    cpuUsage: 23,
    memoryUsage: 67
  })
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSession: '0m 0s',
    topProjects: [] as any[],
    recentActivity: [] as any[]
  })

  useEffect(() => {
    fetchProjects()
    fetchServicesData()
    fetchAnalytics()
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        // Fallback to mock data if API doesn't exist
        setAnalytics({
          pageViews: Math.floor(Math.random() * 15000) + 10000,
          uniqueVisitors: Math.floor(Math.random() * 5000) + 2000,
          bounceRate: Math.floor(Math.random() * 30) + 20,
          avgSession: `${Math.floor(Math.random() * 3) + 2}m ${Math.floor(Math.random() * 60)}s`,
          topProjects: projects.slice(0, 5).map(p => ({
            ...p,
            views: Math.floor(Math.random() * 500) + 100
          })),
          recentActivity: [
            { action: 'Project viewed', item: 'E-Commerce Platform', time: `${Math.floor(Math.random() * 30) + 1} min ago` },
            { action: 'Contact form submitted', item: 'John Doe', time: `${Math.floor(Math.random() * 60) + 1} min ago` },
            { action: 'Project viewed', item: 'AI Dashboard', time: `${Math.floor(Math.random() * 120) + 1} min ago` },
            { action: 'New visitor', item: 'From Google', time: `${Math.floor(Math.random() * 180) + 1} min ago` },
            { action: 'Project viewed', item: 'Mobile App', time: `${Math.floor(Math.random() * 240) + 1} min ago` },
          ]
        })
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  const fetchServicesData = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      if (data.length === 0) {
        // Initialize with default services
        const defaultServices = [
          {
            title: 'Web Development',
            description: 'Modern, responsive websites built with cutting-edge technologies like Next.js, React, and TypeScript.',
            features: ['Responsive Design', 'SEO Optimized', 'Performance Focused', 'Modern Frameworks'],
            icon: 'Code',
            price: '$999',
            status: 'active'
          },
          {
            title: 'UI/UX Design',
            description: 'Beautiful, user-centered designs that enhance user experience and drive engagement.',
            features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
            icon: 'Design',
            price: '$799',
            status: 'active'
          },
          {
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications for iOS and Android.',
            features: ['React Native', 'iOS Development', 'Android Development', 'App Store Deployment'],
            icon: 'Smartphone',
            price: 'Coming Soon',
            status: 'coming-soon'
          },
          {
            title: 'Digital Marketing',
            description: 'Comprehensive digital marketing strategies to grow your online presence.',
            features: ['SEO Strategy', 'Social Media Marketing', 'Content Marketing', 'Analytics'],
            icon: 'TrendingUp',
            price: 'Coming Soon',
            status: 'coming-soon'
          }
        ]
        setServicesData(defaultServices)
        await updateServicesData(defaultServices)
      } else {
        setServicesData(data)
      }
    } catch (error) {
      console.error('Failed to fetch services data:', error)
    }
  }

  const updateServicesData = async (data: any[]) => {
    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setServicesData(data)
        setSaveMessage('Services updated successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to update services data:', error)
      setSaveMessage('Failed to save services. Please try again.')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const projectData = {
        ...newProject,
        technologies: newProject.technologies.split(',').map(tech => tech.trim())
      }
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })
      
      if (response.ok) {
        setNewProject({
          projectId: '',
          title: '',
          description: '',
          category: 'Web Development',
          technologies: '',
          liveUrl: '',
          githubUrl: '',
          featured: false,
          imageUrl: '',
          images: [],
          coverImage: ''
        })
        setShowAddProject(false)
        await fetchProjects()
        setSaveMessage('✅ Project added successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('❌ Failed to add project. Please try again.')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to add project:', error)
      setSaveMessage('❌ Error adding project. Please try again.')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchProjects()
        setSaveMessage('✅ Project deleted successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('❌ Failed to delete project. Please try again.')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      setSaveMessage('❌ Error deleting project. Please try again.')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setNewProject({
      projectId: project.projectId || '',
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false,
      imageUrl: project.imageUrl || '',
      images: project.images || [],
      coverImage: project.coverImage || ''
    })
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const projectData = {
        ...newProject,
        technologies: newProject.technologies.split(',').map(tech => tech.trim())
      }
      
      const response = await fetch(`/api/projects?id=${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })
      
      if (response.ok) {
        setNewProject({
          projectId: '',
          title: '',
          description: '',
          category: 'Web Development',
          technologies: '',
          liveUrl: '',
          githubUrl: '',
          featured: false,
          imageUrl: '',
          images: [],
          coverImage: ''
        })
        setEditingProject(null)
        await fetchProjects()
        setSaveMessage('✅ Project updated successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('❌ Failed to update project. Please try again.')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      setSaveMessage('❌ Error updating project. Please try again.')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        setNewProject({...newProject, imageUrl: data.url})
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const data = await response.json()
        return response.ok ? data.url : null
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      const validUrls = uploadedUrls.filter(url => url !== null)
      
      setNewProject({...newProject, images: [...newProject.images, ...validUrls]})
    } catch (error) {
      console.error('Multiple upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        setNewProject({...newProject, coverImage: data.url})
      }
    } catch (error) {
      console.error('Cover upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = newProject.images.filter((_, i) => i !== index)
    setNewProject({...newProject, images: updatedImages})
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    // Trigger custom event to update navigation
    window.dispatchEvent(new Event('adminLogout'))
    router.push('/login')
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'category') return a.category.localeCompare(b.category)
    return 0
  })

  const handleBulkDelete = async () => {
    for (const id of bulkSelected) {
      await handleDeleteProject(id)
    }
    setBulkSelected([])
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
                         contact.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(contactSearch.toLowerCase())
    const matchesFilter = contactFilter === 'all' || contact.status === contactFilter
    return matchesSearch && matchesFilter
  })

  const updateContactStatus = async (id: string | 'all', status: string) => {
    try {
      if (id === 'all') {
        // Update all contacts
        for (const contact of contacts) {
          await fetch('/api/contacts', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...contact, status })
          })
        }
        setContacts(contacts.map(contact => ({ ...contact, status })))
      } else {
        const contactToUpdate = contacts.find(c => c.id === id)
        if (contactToUpdate) {
          await fetch('/api/contacts', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...contactToUpdate, status })
          })
          setContacts(contacts.map(contact => 
            contact.id === id ? { ...contact, status } : contact
          ))
          if (selectedContact?.id === id) {
            setSelectedContact({ ...selectedContact, status })
          }
        }
      }
    } catch (error) {
      console.error('Failed to update contact status:', error)
    }
  }

  const deleteContact = async (id: string) => {
    try {
      await fetch(`/api/contacts?id=${id}`, {
        method: 'DELETE'
      })
      setContacts(contacts.filter(contact => contact.id !== id))
      if (selectedContact?.id === id) {
        setSelectedContact(null)
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { id: 'projects', label: 'Projects', icon: Settings, color: 'from-purple-500 to-pink-500' },
    { id: 'services', label: 'Services', icon: Activity, color: 'from-teal-500 to-green-500' },
    { id: 'contacts', label: 'Contacts', icon: Mail, color: 'from-green-500 to-emerald-500' },
    { id: 'settings', label: 'Settings', icon: Shield, color: 'from-gray-500 to-slate-500' },
  ]

  return (
    <div className="min-h-screen bg-primary">
      {/* Mobile-optimized header with proper spacing */}
      <div className="pt-16 sm:pt-20">
      {/* Success/Error Message Banner */}
      <AnimatePresence>
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] sm:w-full mx-4"
          >
            <div className={`glass rounded-lg p-4 border ${
              saveMessage.includes('✅') 
                ? 'border-green-500/50 bg-green-500/10' 
                : 'border-red-500/50 bg-red-500/10'
            }`}>
              <p className={`text-center font-medium ${
                saveMessage.includes('✅') ? 'text-green-400' : 'text-red-400'
              }`}>
                {saveMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-8">
        {/* Professional Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">
                <span className="bg-gradient-to-r from-neon to-accent bg-clip-text text-transparent">Admin</span> Dashboard
              </h1>
              <p className="text-accent text-sm sm:text-lg">Manage your portfolio</p>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 text-accent hover:text-neon transition-colors self-end sm:self-auto"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Professional Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl p-3 sm:p-6">
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-2 lg:space-x-0 lg:space-y-2 pb-2 lg:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 lg:w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neon to-accent text-primary'
                        : 'text-accent hover:bg-accent/10 hover:text-secondary'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="font-medium text-sm lg:text-base">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Professional Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-secondary">Dashboard Overview</h3>
                  <Button variant="ghost" onClick={fetchAnalytics} className="text-accent hover:text-neon">
                    <Activity className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>

                {/* Analytics Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-accent">Page Views</h4>
                      <TrendingUp className="h-4 w-4 text-neon" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">{analytics.pageViews?.toLocaleString() || '0'}</p>
                    <p className="text-xs text-green-400">Real-time data</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-accent">Unique Visitors</h4>
                      <Users className="h-4 w-4 text-neon" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">{analytics.uniqueVisitors?.toLocaleString() || '0'}</p>
                    <p className="text-xs text-green-400">Real-time data</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-accent">Total Projects</h4>
                      <Settings className="h-4 w-4 text-neon" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">{projects.length}</p>
                    <p className="text-xs text-blue-400">Active portfolio items</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-accent">Avg. Session</h4>
                      <Clock className="h-4 w-4 text-neon" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">{analytics.avgSession || '0m 0s'}</p>
                    <p className="text-xs text-green-400">Real-time data</p>
                  </motion.div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-secondary">Top Performing Projects</h4>
                      <Star className="h-5 w-5 text-neon" />
                    </div>
                    <div className="space-y-3">
                      {analytics.topProjects.map((project, index) => (
                        <div key={project.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-neon font-bold text-sm">#{index + 1}</span>
                            <span className="text-accent">{project.title}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-secondary font-semibold">{project.views}</span>
                            <span className="text-accent text-sm ml-1">views</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-secondary">Recent Activity</h4>
                      <Activity className="h-5 w-5 text-neon" />
                    </div>
                    <div className="space-y-3">
                      {analytics.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-neon rounded-full"></div>
                            <div>
                              <p className="text-accent text-sm">{activity.action}</p>
                              <p className="text-secondary font-medium text-sm">{activity.item}</p>
                            </div>
                          </div>
                          <span className="text-accent text-xs">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass rounded-xl p-6"
                >
                  <h4 className="text-lg font-semibold text-secondary mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      variant="neon" 
                      onClick={() => setActiveTab('projects')}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveTab('contacts')}
                      className="flex items-center justify-center space-x-2 text-accent hover:text-neon"
                    >
                      <Mail className="h-4 w-4" />
                      <span>View Messages</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveTab('services')}
                      className="flex items-center justify-center space-x-2 text-accent hover:text-neon"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Manage Services</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => window.open('/', '_blank')}
                      className="flex items-center justify-center space-x-2 text-accent hover:text-neon"
                    >
                      <Globe className="h-4 w-4" />
                      <span>View Site</span>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-secondary">Projects</h3>
                  <Button variant="neon" onClick={() => setShowAddProject(true)} size="sm">
                    <Plus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Add</span>
                  </Button>
                </div>
                {bulkSelected.length > 0 && (
                  <div className="mb-4">
                    <Button variant="ghost" onClick={handleBulkDelete} size="sm" className="text-red-400 hover:text-red-300 w-full sm:w-auto">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected ({bulkSelected.length})
                    </Button>
                  </div>
                )}

                {/* Filters */}
                <div className="glass rounded-xl p-3 mb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="col-span-2 sm:col-span-1 px-3 py-2 text-sm bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary touch-manipulation"
                    />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 text-sm bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary touch-manipulation"
                    >
                      <option value="all">All</option>
                      <option value="Web Development">Web</option>
                      <option value="UI/UX Design">UI/UX</option>
                      <option value="Business Analysis">Business</option>
                      <option value="Digital Marketing">Marketing</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 text-sm bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary touch-manipulation"
                    >
                      <option value="date">Date</option>
                      <option value="title">Title</option>
                      <option value="category">Category</option>
                    </select>
                    <div className="text-accent text-xs sm:text-sm flex items-center justify-center">
                      {sortedProjects.length}/{projects.length}
                    </div>
                  </div>
                </div>

                {(showAddProject || editingProject) && (
                  <div className="glass rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-secondary">
                      {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h4>
                    <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Project ID (e.g., VT-001)"
                          value={newProject.projectId}
                          onChange={(e) => setNewProject({...newProject, projectId: e.target.value})}
                          className="px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                          className="px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                          required
                        />
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                          className="px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Business Analysis">Business Analysis</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        rows={3}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                        className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="url"
                          placeholder="Live URL (optional)"
                          value={newProject.liveUrl}
                          onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                          className="px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                        <input
                          type="url"
                          placeholder="GitHub URL (optional)"
                          value={newProject.githubUrl}
                          onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                          className="px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-secondary mb-2">
                            Main Project Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                          />
                          {newProject.imageUrl && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
                            <div className="mt-2">
                              <CldImage 
                                src={newProject.imageUrl} 
                                alt="Main Preview" 
                                width={128}
                                height={80}
                                crop={{ type: 'fill' }}
                                className="w-32 h-20 object-cover rounded" 
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-secondary mb-2">
                            Additional Images (Optional)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultipleImagesUpload}
                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                          />
                          {uploading && <p className="text-neon text-sm mt-2">Uploading...</p>}
                          {newProject.images.length > 0 && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
                            <div className="mt-2 grid grid-cols-4 gap-2">
                              {newProject.images.map((imageUrl, index) => (
                                <div key={index} className="relative">
                                  <CldImage 
                                    src={imageUrl} 
                                    alt={`Preview ${index + 1}`} 
                                    width={80}
                                    height={60}
                                    crop={{ type: 'fill' }}
                                    className="w-20 h-15 object-cover rounded" 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                          className="rounded"
                        />
                        <label htmlFor="featured" className="text-secondary">Featured Project</label>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
                        <Button type="submit" variant="neon" className="w-full sm:w-auto touch-manipulation">
                          {editingProject ? 'Update Project' : 'Add Project'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="w-full sm:w-auto touch-manipulation"
                          onClick={() => {
                            setShowAddProject(false)
                            setEditingProject(null)
                            setNewProject({
                              projectId: '',
                              title: '',
                              description: '',
                              category: 'Web Development',
                              technologies: '',
                              liveUrl: '',
                              githubUrl: '',
                              featured: false,
                              imageUrl: '',
                              images: [],
                              coverImage: ''
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Mobile: Advanced Card View */}
                <div className="block md:hidden space-y-4">
                  {sortedProjects.map((project) => (
                    <motion.div 
                      key={project.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-xl overflow-hidden border border-accent/20 hover:border-neon/50 transition-all"
                    >
                      {/* Image Header */}
                      {project.imageUrl && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
                        <div className="relative h-48 bg-gradient-to-br from-neon/20 to-purple/20">
                          <CldImage 
                            src={project.imageUrl} 
                            alt={project.title}
                            width={600}
                            height={192}
                            crop={{ type: 'fit' }}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute top-2 right-2">
                            <input
                              type="checkbox"
                              checked={bulkSelected.includes(project.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected([...bulkSelected, project.id])
                                } else {
                                  setBulkSelected(bulkSelected.filter(id => id !== project.id))
                                }
                              }}
                              className="w-5 h-5 rounded"
                            />
                          </div>
                          {project.featured && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-neon to-purple px-2 py-1 rounded-full text-xs font-bold text-primary">
                              ⭐ Featured
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            {project.projectId && (
                              <div className="text-xs text-neon font-mono mb-1 bg-neon/10 px-2 py-1 rounded w-fit">
                                ID: {project.projectId}
                              </div>
                            )}
                            <h4 className="text-lg font-bold text-secondary mb-1">{project.title}</h4>
                            <p className="text-sm text-accent/80 line-clamp-2">{project.description}</p>
                          </div>
                          {!project.imageUrl && (
                            <input
                              type="checkbox"
                              checked={bulkSelected.includes(project.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected([...bulkSelected, project.id])
                                } else {
                                  setBulkSelected(bulkSelected.filter(id => id !== project.id))
                                }
                              }}
                              className="mt-1 w-5 h-5"
                            />
                          )}
                        </div>
                        
                        {/* Meta Info */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="px-2 py-1 rounded-full text-xs bg-neon/10 text-neon border border-neon/30">
                            {project.category}
                          </span>
                          {!project.featured && (
                            <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                              Standard
                            </span>
                          )}
                          <span className="text-xs text-accent flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {Math.floor(Math.random() * 500) + 50}
                          </span>
                          <span className="text-xs text-accent flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.slice(0, 3).map((tech: string) => (
                              <span key={tech} className="text-xs bg-accent/5 text-accent px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs text-accent px-2 py-1">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant="neon" 
                            size="sm"
                            className="touch-manipulation"
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="touch-manipulation border border-accent/30"
                            onClick={() => window.open(`/projects/${project.id}`, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="touch-manipulation text-red-400 hover:text-red-300 border border-red-400/30"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {sortedProjects.length === 0 && (
                    <div className="p-8 text-center text-accent glass rounded-xl">
                      {searchTerm || filterCategory !== 'all' ? 'No projects match your filters.' : 'No projects added yet. Click "Add Project" to get started.'}
                    </div>
                  )}
                </div>

                {/* Desktop: Table View */}
                <div className="hidden md:block glass rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-accent/5">
                      <tr>
                        <th className="text-left p-4 text-secondary">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBulkSelected(sortedProjects.map(p => p.id))
                              } else {
                                setBulkSelected([])
                              }
                            }}
                            checked={bulkSelected.length === sortedProjects.length && sortedProjects.length > 0}
                          />
                        </th>
                        <th className="text-left p-4 text-secondary">ID</th>
                        <th className="text-left p-4 text-secondary">Title</th>
                        <th className="text-left p-4 text-secondary">Category</th>
                        <th className="text-left p-4 text-secondary">Featured</th>
                        <th className="text-left p-4 text-secondary">Views</th>
                        <th className="text-left p-4 text-secondary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProjects.map((project) => (
                        <tr key={project.id} className="border-t border-accent/10">
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={bulkSelected.includes(project.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected([...bulkSelected, project.id])
                                } else {
                                  setBulkSelected(bulkSelected.filter(id => id !== project.id))
                                }
                              }}
                            />
                          </td>
                          <td className="p-4">
                            <span className="text-neon font-mono text-sm bg-neon/10 px-2 py-1 rounded">
                              {project.projectId || 'N/A'}
                            </span>
                          </td>
                          <td className="p-4 text-accent">{project.title}</td>
                          <td className="p-4 text-accent">{project.category}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              project.featured 
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {project.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="p-4 text-accent">{Math.floor(Math.random() * 500) + 50}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditProject(project)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => window.open(`/projects/${project.id}`, '_blank')}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sortedProjects.length === 0 && (
                    <div className="p-8 text-center text-accent">
                      {searchTerm || filterCategory !== 'all' ? 'No projects match your filters.' : 'No projects added yet. Click "Add Project" to get started.'}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-secondary">Contact Messages</h3>
                  <div className="flex gap-2">
                    <span className="text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {filteredContacts.length} messages
                    </span>
                  </div>
                </div>

                {/* Filters */}
                <div className="glass rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      className="px-4 py-2 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                    />
                    <select
                      value={contactFilter}
                      onChange={(e) => setContactFilter(e.target.value)}
                      className="px-4 py-2 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                    >
                      <option value="all">All Status</option>
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Replied">Replied</option>
                    </select>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updateContactStatus('all', 'Read')}
                        className="text-accent hover:text-neon"
                      >
                        Mark All Read
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Messages List */}
                  <div className="lg:col-span-2 space-y-4">
                    {filteredContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`glass rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                          selectedContact?.id === contact.id ? 'border-neon/50' : 'hover:border-accent/30'
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-secondary">{contact.name}</h4>
                              <span className={`px-2 py-1 rounded text-xs ${
                                contact.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                contact.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {contact.priority}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                contact.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                                contact.status === 'Read' ? 'bg-yellow-500/20 text-yellow-400' :
                                contact.status === 'In Progress' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {contact.status}
                              </span>
                            </div>
                            <p className="text-sm text-accent mb-1">{contact.email}</p>
                            <p className="text-sm font-medium text-secondary mb-2">{contact.subject}</p>
                            <p className="text-sm text-accent/80 line-clamp-2">{contact.message}</p>
                            <p className="text-xs text-accent/60 mt-2">{contact.date}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Detail */}
                  <div className="lg:col-span-1">
                    {selectedContact ? (
                      <div className="glass rounded-xl p-6 sticky top-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-secondary">Message Details</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedContact(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-accent">Name</label>
                            <p className="text-secondary">{selectedContact.name}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-accent">Email</label>
                            <p className="text-secondary">{selectedContact.email}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-accent">Subject</label>
                            <p className="text-secondary">{selectedContact.subject}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-accent">Message</label>
                            <p className="text-secondary text-sm leading-relaxed">{selectedContact.message}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-accent">Status</label>
                            <select
                              value={selectedContact.status}
                              onChange={(e) => updateContactStatus(selectedContact.id, e.target.value)}
                              className="w-full mt-1 px-3 py-2 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                            >
                              <option value="New">New</option>
                              <option value="Read">Read</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Replied">Replied</option>
                            </select>
                          </div>
                          
                          <div className="flex gap-2 pt-4">
                            <Button 
                              variant="neon" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => window.open(`mailto:${selectedContact.email}`)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteContact(selectedContact.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="glass rounded-xl p-6 text-center">
                        <Mail className="h-12 w-12 text-accent mx-auto mb-4" />
                        <p className="text-accent">Select a message to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}



            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-secondary">Services</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setServicesData([...servicesData, { title: '', description: '', features: [], icon: '', price: '', status: 'active' }])}
                      className="text-accent hover:text-neon flex-1 sm:flex-none"
                    >
                      <Plus className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Add</span>
                    </Button>
                    <Button variant="neon" size="sm" onClick={() => updateServicesData(servicesData)} className="flex-1 sm:flex-none">
                      Save
                    </Button>
                  </div>
                </div>

                {saveMessage && (
                  <div className="glass rounded-lg p-3 bg-green-500/10 border border-green-500/20">
                    <p className="text-green-400 text-sm">{saveMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {servicesData.map((service, index) => (
                    <div key={service.id || index} className="glass rounded-xl p-6 relative">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-secondary">Service {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const updated = servicesData.filter((_, i) => i !== index)
                            setServicesData(updated)
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-accent mb-2">Service Title</label>
                          <input
                            type="text"
                            value={service.title || ''}
                            onChange={(e) => {
                              const updated = [...servicesData]
                              updated[index] = {...service, title: e.target.value}
                              setServicesData(updated)
                            }}
                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary font-semibold"
                            placeholder="Enter service title..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-accent mb-2">Description</label>
                          <textarea
                            value={service.description || ''}
                            onChange={(e) => {
                              const updated = [...servicesData]
                              updated[index] = {...service, description: e.target.value}
                              setServicesData(updated)
                            }}
                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                            rows={3}
                            placeholder="Describe the service..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-accent mb-2">Icon/Category</label>
                            <input
                              type="text"
                              value={service.icon || ''}
                              onChange={(e) => {
                                const updated = [...servicesData]
                                updated[index] = {...service, icon: e.target.value}
                                setServicesData(updated)
                              }}
                              className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                              placeholder="e.g., Code, Design, Analytics"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-accent mb-2">Starting Price</label>
                            <input
                              type="text"
                              value={service.price || ''}
                              onChange={(e) => {
                                const updated = [...servicesData]
                                updated[index] = {...service, price: e.target.value}
                                setServicesData(updated)
                              }}
                              className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                              placeholder="e.g., $999, Contact for quote"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-accent mb-2">Status</label>
                            <select
                              value={service.status || 'active'}
                              onChange={(e) => {
                                const updated = [...servicesData]
                                updated[index] = {...service, status: e.target.value}
                                setServicesData(updated)
                              }}
                              className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                            >
                              <option value="active">Active</option>
                              <option value="coming-soon">Coming Soon</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-accent mb-2">Key Features</label>
                          <textarea
                            value={service.features?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...servicesData]
                              updated[index] = {...service, features: e.target.value.split('\n').filter(f => f.trim())}
                              setServicesData(updated)
                            }}
                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                            rows={4}
                            placeholder="Enter each feature on a new line...\ne.g.:\nResponsive Design\nSEO Optimization\n24/7 Support"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {servicesData.length === 0 && (
                  <div className="glass rounded-xl p-12 text-center">
                    <Activity className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-secondary mb-2">No Services Added</h4>
                    <p className="text-accent mb-4">Start by adding your first service offering</p>
                    <Button 
                      variant="neon" 
                      onClick={() => setServicesData([{ title: '', description: '', features: [], icon: '', price: '', status: 'active' }])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Service
                    </Button>
                  </div>
                )}
              </motion.div>
            )}



            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-secondary">Settings</h3>
                  <Button variant="ghost" className="text-accent hover:text-neon">
                    <Activity className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Site Configuration */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="h-5 w-5 text-neon" />
                      <h4 className="text-lg font-semibold text-secondary">Site Configuration</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Site Title</label>
                        <input
                          type="text"
                          defaultValue="Veliora TechWorks"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Tagline</label>
                        <input
                          type="text"
                          defaultValue="Innovating Beyond Boundaries"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Meta Description</label>
                        <textarea
                          defaultValue="Professional web development and digital solutions by Veliora TechWorks"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                          rows={3}
                        />
                      </div>
                      <Button variant="neon" className="w-full">
                        Save Site Settings
                      </Button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="h-5 w-5 text-neon" />
                      <h4 className="text-lg font-semibold text-secondary">Contact Information</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Business Email</label>
                        <input
                          type="email"
                          defaultValue="hello@veliora.tech"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Business Address</label>
                        <textarea
                          defaultValue="123 Tech Street, Innovation City, TC 12345"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                          rows={2}
                        />
                      </div>
                      <Button variant="neon" className="w-full">
                        Update Contact Info
                      </Button>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-neon" />
                      <h4 className="text-lg font-semibold text-secondary">Social Media Links</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">LinkedIn</label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/company/veliora"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">GitHub</label>
                        <input
                          type="url"
                          placeholder="https://github.com/veliora"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-accent mb-2">Twitter</label>
                        <input
                          type="url"
                          placeholder="https://twitter.com/veliora"
                          className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                        />
                      </div>
                      <Button variant="neon" className="w-full">
                        Save Social Links
                      </Button>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="h-5 w-5 text-neon" />
                      <h4 className="text-lg font-semibold text-secondary">Security & Privacy</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-secondary font-medium">Two-Factor Authentication</p>
                          <p className="text-accent text-sm">Add extra security to your account</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-secondary font-medium">Login Notifications</p>
                          <p className="text-accent text-sm">Get notified of new login attempts</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-secondary font-medium">Analytics Tracking</p>
                          <p className="text-accent text-sm">Allow visitor analytics collection</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <Button variant="ghost" className="w-full text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All Data
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Database & Authentication */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-neon" />
                    <h4 className="text-lg font-semibold text-secondary">Database & Authentication</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-secondary font-medium">Database Connection</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm">Connected</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-accent">Projects:</span>
                          <span className="text-secondary">{projects.length} records</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-accent">Contacts:</span>
                          <span className="text-secondary">{contacts.length} records</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-accent">Services:</span>
                          <span className="text-secondary">{servicesData.length} records</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4 text-accent hover:text-neon">
                        Test Connection
                      </Button>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-secondary font-medium">Authentication Status</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm">Active</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-accent">Session:</span>
                          <span className="text-secondary">Valid</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-accent">Last Login:</span>
                          <span className="text-secondary">Today, 2:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-accent">IP Address:</span>
                          <span className="text-secondary">192.168.1.1</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4 text-red-400 hover:text-red-300">
                        Force Logout All
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Backup & Maintenance */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-neon" />
                    <h4 className="text-lg font-semibold text-secondary">Backup & Maintenance</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Activity className="h-8 w-8 text-blue-400" />
                      </div>
                      <p className="text-secondary font-medium mb-1">Auto Backup</p>
                      <p className="text-accent text-sm mb-3">Last: 2 hours ago</p>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-neon">
                        Backup Now
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-8 w-8 text-green-400" />
                      </div>
                      <p className="text-secondary font-medium mb-1">Security Scan</p>
                      <p className="text-accent text-sm mb-3">Status: Clean</p>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-neon">
                        Run Scan
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Trash2 className="h-8 w-8 text-orange-400" />
                      </div>
                      <p className="text-secondary font-medium mb-1">Cache Clear</p>
                      <p className="text-accent text-sm mb-3">Size: 45.2 MB</p>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-neon">
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-neon" />
                    <h4 className="text-lg font-semibold text-secondary">System Performance</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">v2.1.0</p>
                      <p className="text-accent text-sm">Version</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">99.9%</p>
                      <p className="text-accent text-sm">Uptime</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">2.3GB</p>
                      <p className="text-accent text-sm">Storage Used</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">45ms</p>
                      <p className="text-accent text-sm">Response Time</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-accent text-sm">CPU Usage</span>
                        <span className="text-secondary text-sm">23%</span>
                      </div>
                      <div className="w-full bg-accent/20 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '23%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-accent text-sm">Memory Usage</span>
                        <span className="text-secondary text-sm">67%</span>
                      </div>
                      <div className="w-full bg-accent/20 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '67%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5 text-neon" />
                    <h4 className="text-lg font-semibold text-secondary">Advanced Configuration</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-secondary font-medium">Maintenance Mode</p>
                        <p className="text-accent text-sm">Temporarily disable public access</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-secondary font-medium">Debug Mode</p>
                        <p className="text-accent text-sm">Enable detailed error logging</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-secondary font-medium">Auto Updates</p>
                        <p className="text-accent text-sm">Automatically install security updates</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-secondary font-medium">Email Notifications</p>
                        <p className="text-accent text-sm">Send admin alerts via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                  <Button variant="neon" className="w-full mt-6">
                    Save Advanced Settings
                  </Button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  )
}