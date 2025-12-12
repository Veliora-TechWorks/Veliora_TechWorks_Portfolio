'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage(data.message || 'Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        setStatusMessage(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
              <span className="metallic-text">Get</span> In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can help bring your vision to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile/Tablet: Reconstructed Layout */}
          <div className="block lg:hidden">
            {/* Contact Form First */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg focus:border-blue-400 focus:outline-none text-white resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="neon"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {submitStatus !== 'idle' && (
                  <div className={`p-4 rounded-lg text-center ${submitStatus === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </motion.div>

            {/* Contact Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/10 mb-8"
            >
              <h3 className="text-lg font-semibold mb-4 text-white text-center">Get in Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Email</h4>
                    <p className="text-gray-400 text-xs">velioratechworks@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Phone</h4>
                    <p className="text-gray-400 text-xs">+91 86238 96542</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Location</h4>
                    <p className="text-gray-400 text-xs">Pune, Maharashtra</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Hours</h4>
                    <p className="text-gray-400 text-xs">Mon - Fri : 10AM - 6PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <a
                href="mailto:velioratechworks@gmail.com"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200/10 text-center hover:border-blue-400/50 transition-colors"
              >
                <Mail className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Email Us</span>
              </a>
              
              <a
                href="tel:+918623896542"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200/10 text-center hover:border-blue-400/50 transition-colors"
              >
                <Phone className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Call Us</span>
              </a>
            </motion.div>
          </div>

          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:grid grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 metallic-text">Let's Connect</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-metallic-gradient rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary text-sm">Email</h3>
                    <p className="text-accent text-sm">velioratechworks@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-metallic-gradient rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary text-sm">Phone</h3>
                    <p className="text-accent text-sm">+91 86238 96542</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-metallic-gradient rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary text-sm">Location</h3>
                    <p className="text-accent text-sm">Pune, Maharashtra</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-metallic-gradient rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary text-sm">Business Hours</h3>
                    <p className="text-accent text-sm">Mon - Fri : 10AM - 6PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-metallic-gradient rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary text-sm">Global Reach</h3>
                    <p className="text-accent text-sm">Serving clients worldwide</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 h-48 glass rounded-xl flex items-center justify-center">
                <p className="text-accent text-sm">Interactive Map Coming Soon</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 metallic-text">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:border-neon focus:outline-none text-secondary resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="neon"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {submitStatus !== 'idle' && (
                  <div className={`p-4 rounded-lg text-center ${submitStatus === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="metallic-text">Frequently</span> Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'What is your typical project timeline?',
                answer: 'Project timelines vary based on complexity, but most projects range from 4-12 weeks from start to finish.',
              },
              {
                question: 'Do you provide ongoing support?',
                answer: 'Yes, we offer comprehensive support and maintenance packages to ensure your project continues to perform optimally.',
              },
              {
                question: 'What technologies do you specialize in?',
                answer: 'We specialize in modern web technologies including Next.js, React, TypeScript, Node.js, and cloud platforms like AWS.',
              },
              {
                question: 'How do you handle project communication?',
                answer: 'We maintain regular communication through weekly updates, project management tools, and scheduled check-ins.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-base lg:text-lg font-semibold text-secondary mb-3">{faq.question}</h3>
                <p className="text-accent text-sm lg:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}