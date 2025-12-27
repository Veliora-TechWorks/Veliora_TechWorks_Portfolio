'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Team() {
  const [founder, setFounder] = useState<any>({})
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [founderRes, teamRes] = await Promise.all([
          fetch('/api/founder'),
          fetch('/api/team')
        ])
        
        const founderData = await founderRes.json()
        const teamData = await teamRes.json()
        
        setFounder(founderData)
        setTeam(teamData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-accent">Loading...</div>
      </div>
    )
  }
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="metallic-text">Team</span>
            </h1>
            <p className="text-accent text-lg max-w-2xl mx-auto">
              The passionate professionals behind Veliora TechWorks
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="metallic-text">Founder's</span> Message
            </h2>
          </motion.div>

          {/* Desktop/Tablet Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="hidden md:block glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 text-center">
                <div className="w-48 h-64 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon/20 to-purple/20 p-2">
                  <div className="w-full h-full rounded-xl bg-white/10 overflow-hidden">
                    <img 
                      src={founder.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"} 
                      alt={founder.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">{founder.name}</h3>
                <p className="text-neon font-medium mb-4">{founder.title}</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-accent hover:text-neon border border-accent/20 hover:border-neon/50">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">Contact</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-neon border border-accent/20 hover:border-neon/50">
                    <Linkedin className="h-4 w-4 mr-2" />
                    <span className="text-sm">LinkedIn</span>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-neon/30 absolute -top-2 -left-2" />
                  <p className="text-accent text-lg leading-relaxed italic pl-6">
                    {founder.message}
                  </p>
                </div>
                <p className="text-accent mb-6 leading-relaxed">
                  {founder.bio}
                </p>
                <div>
                  <h4 className="text-secondary font-semibold mb-4 text-lg">Areas of Expertise</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {founder.expertise?.map((skill: string) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-neon rounded-full"></div>
                        <span className="text-accent font-medium">{skill}</span>
                      </div>
                    )) || []}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:hidden glass rounded-2xl p-6"
          >
            <div className="text-center mb-6">
              <div className="w-32 h-40 mx-auto mb-4 rounded-xl bg-gradient-to-br from-neon/20 to-purple/20 p-2">
                <div className="w-full h-full rounded-lg bg-white/10 overflow-hidden">
                  <img 
                    src={founder.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"} 
                    alt={founder.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-1">{founder.name}</h3>
              <p className="text-neon font-medium mb-3">{founder.title}</p>
            </div>
            
            <div className="relative mb-4">
              <Quote className="h-6 w-6 text-neon/30 absolute -top-1 -left-1" />
              <p className="text-accent leading-relaxed italic pl-4 text-sm">
                {founder.message}
              </p>
            </div>
            
            <p className="text-accent mb-4 leading-relaxed text-sm">
              {founder.bio}
            </p>

            <div className="mb-4">
              <h4 className="text-secondary font-semibold mb-3 text-sm">Areas of Expertise</h4>
              <div className="space-y-2">
                {founder.expertise?.map((skill: string) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-neon rounded-full"></div>
                    <span className="text-accent text-sm">{skill}</span>
                  </div>
                )) || []}
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <Button variant="ghost" size="sm" className="text-accent hover:text-neon border border-accent/20 hover:border-neon/50 px-3">
                <Mail className="h-3 w-3 mr-1" />
                <span className="text-xs">Email</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-accent hover:text-neon border border-accent/20 hover:border-neon/50 px-3">
                <Linkedin className="h-3 w-3 mr-1" />
                <span className="text-xs">LinkedIn</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="metallic-text">Team</span>
            </h2>
            <p className="text-accent max-w-2xl mx-auto">
              Talented professionals dedicated to delivering exceptional results
            </p>
          </motion.div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 text-center hover:border-neon/30 transition-all duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon/20 to-purple/20 p-2">
                  <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                    <img 
                      src={member.image || `https://images.unsplash.com/photo-${index === 0 ? '1494790108755-2616b612b786' : index === 1 ? '1472099645785-5658abf4ff4e' : '1438761681033-6461ffad8d80'}?w=400&h=400&fit=crop&crop=face`} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-secondary mb-1">{member.name}</h3>
                <p className="text-neon font-medium mb-2">{member.title}</p>
                <div className="flex justify-center space-x-4 mb-4 text-xs text-accent">
                  <span>{member.experience}</span>
                  <span>•</span>
                  <span>{member.projects}</span>
                </div>
                
                <p className="text-accent text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mb-6">
                  <h4 className="text-secondary font-semibold mb-3 text-sm">Core Expertise</h4>
                  <div className="space-y-2">
                    {member.expertise?.map((skill: string) => (
                      <div key={skill} className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-neon rounded-full"></div>
                        <span className="text-accent text-sm">{skill}</span>
                      </div>
                    )) || []}
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-accent hover:text-neon border border-accent/20 hover:border-neon/50">
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-neon border border-accent/20 hover:border-neon/50">
                    <Linkedin className="h-4 w-4 mr-1" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="sm:hidden space-y-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4 border-l-4 border-neon"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon/20 to-purple/20 p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                      <img 
                        src={member.image || `https://images.unsplash.com/photo-${index === 0 ? '1494790108755-2616b612b786' : index === 1 ? '1472099645785-5658abf4ff4e' : '1438761681033-6461ffad8d80'}?w=400&h=400&fit=crop&crop=face`} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-secondary mb-1">{member.name}</h3>
                    <p className="text-neon font-medium text-sm mb-1">{member.title}</p>
                    <div className="flex space-x-2 mb-2 text-xs text-accent">
                      <span>{member.experience}</span>
                      <span>•</span>
                      <span>{member.projects}</span>
                    </div>
                    <p className="text-accent text-sm mb-3 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="mb-3">
                      <h4 className="text-secondary font-semibold mb-2 text-xs">Expertise</h4>
                      <div className="space-y-1">
                        {member.expertise?.slice(0, 2).map((skill: string) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-neon rounded-full"></div>
                            <span className="text-accent text-xs">{skill}</span>
                          </div>
                        )) || []}
                        {member.expertise && member.expertise.length > 2 && (
                          <span className="text-neon text-xs">+{member.expertise.length - 2} more</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-accent hover:text-neon p-1 border border-accent/20">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-neon p-1 border border-accent/20">
                        <Linkedin className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}