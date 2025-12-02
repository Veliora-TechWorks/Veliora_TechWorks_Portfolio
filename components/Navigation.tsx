'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'
import { Button } from './ui/button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdminLoggedIn')
      setIsAdmin(adminStatus === 'true')
    }
    
    // Check admin login status on mount
    checkAdminStatus()
    
    // Listen for storage changes and custom logout event
    window.addEventListener('storage', checkAdminStatus)
    window.addEventListener('adminLogout', checkAdminStatus)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus)
      window.removeEventListener('adminLogout', checkAdminStatus)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/Logo.png" alt="Veliora TechWorks" width={32} height={32} className="w-8 h-8" />
            <span className="metallic-text font-bold text-xl">Veliora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-secondary hover:text-accent transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1 text-neon hover:text-accent transition-colors duration-300 font-medium"
              >
                <Settings size={16} />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass rounded-lg mt-2 p-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-secondary hover:text-accent transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1 py-2 text-neon hover:text-accent transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={16} />
                <span>Dashboard</span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}