'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BarChart3, Users, Mail, Settings, Plus, Edit, Trash2, LogOut, Activity, Zap, Shield, Globe, TrendingUp, Eye, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



const mockContacts = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'New', date: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Read', date: '2024-01-14' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Replied', date: '2024-01-13' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  })

  useEffect(() => {
    fetchProjects()
  }, [])

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
      
      console.log('Adding project:', projectData) // Debug log
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })
      
      const result = await response.json()
      console.log('Add project response:', result) // Debug log
      
      if (response.ok) {
        setNewProject({
          title: '',
          description: '',
          category: 'Web Development',
          technologies: '',
          liveUrl: '',
          githubUrl: '',
          featured: false
        })
        setShowAddProject(false)
        fetchProjects()
      }
    } catch (error) {
      console.error('Failed to add project:', error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    // Trigger custom event to update navigation
    window.dispatchEvent(new Event('adminLogout'))
    router.push('/login')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { id: 'projects', label: 'Projects', icon: Settings, color: 'from-purple-500 to-pink-500' },
    { id: 'contacts', label: 'Contacts', icon: Mail, color: 'from-green-500 to-emerald-500' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { id: 'settings', label: 'Settings', icon: Shield, color: 'from-gray-500 to-slate-500' },
  ]

  return (
    <div className="pt-16 min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-neon to-accent bg-clip-text text-transparent">Admin</span> Dashboard
              </h1>
              <p className="text-accent text-lg">Manage your portfolio content and settings</p>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-accent hover:text-neon transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Professional Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neon to-accent text-primary'
                        : 'text-accent hover:bg-accent/10 hover:text-secondary'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
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
                className="space-y-6"
              >
                {/* Professional Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent text-sm">Total Projects</p>
                        <p className="text-3xl font-bold text-secondary">{projects.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-neon to-accent rounded-lg flex items-center justify-center">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent text-sm">Messages</p>
                        <p className="text-3xl font-bold text-secondary">8</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-neon to-accent rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent text-sm">Total Views</p>
                        <p className="text-3xl font-bold text-secondary">2.4k</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-neon to-accent rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4 text-secondary">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      'New contact form submission from John Doe',
                      'Project "E-Commerce Platform" updated',
                      'New message from Jane Smith',
                      'Project "AI Dashboard" published',
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-neon rounded-full"></div>
                        <p className="text-accent">{activity}</p>
                      </div>
                    ))}
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
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-secondary">Projects</h3>
                  <Button variant="neon" onClick={() => setShowAddProject(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                {showAddProject && (
                  <div className="glass rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-secondary">Add New Project</h4>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div className="flex space-x-4">
                        <Button type="submit" variant="neon">Add Project</Button>
                        <Button type="button" variant="ghost" onClick={() => setShowAddProject(false)}>Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="glass rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-accent/5">
                      <tr>
                        <th className="text-left p-4 text-secondary">Title</th>
                        <th className="text-left p-4 text-secondary">Category</th>
                        <th className="text-left p-4 text-secondary">Featured</th>
                        <th className="text-left p-4 text-secondary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-t border-accent/10">
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
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {projects.length === 0 && (
                    <div className="p-8 text-center text-accent">
                      No projects added yet. Click "Add Project" to get started.
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
                <h3 className="text-2xl font-semibold text-secondary">Contact Messages</h3>

                <div className="glass rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-accent/5">
                      <tr>
                        <th className="text-left p-4 text-secondary">Name</th>
                        <th className="text-left p-4 text-secondary">Email</th>
                        <th className="text-left p-4 text-secondary">Status</th>
                        <th className="text-left p-4 text-secondary">Date</th>
                        <th className="text-left p-4 text-secondary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockContacts.map((contact) => (
                        <tr key={contact.id} className="border-t border-accent/10">
                          <td className="p-4 text-accent">{contact.name}</td>
                          <td className="p-4 text-accent">{contact.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              contact.status === 'New' 
                                ? 'bg-blue-500/20 text-blue-400'
                                : contact.status === 'Read'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {contact.status}
                            </span>
                          </td>
                          <td className="p-4 text-accent">{contact.date}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-secondary">Settings</h3>
                
                <div className="glass rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4 text-secondary">Site Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Site Title
                      </label>
                      <input
                        type="text"
                        defaultValue="Veliora TechWorks"
                        className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        defaultValue="Innovating Beyond Boundaries"
                        className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                      />
                    </div>
                    
                    <Button variant="neon">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}