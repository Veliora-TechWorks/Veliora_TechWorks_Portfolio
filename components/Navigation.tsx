'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    const checkAdminStatus = () => {
      if (typeof window !== 'undefined') {
        const adminStatus = localStorage.getItem('isAdminLoggedIn')
        setIsAdmin(adminStatus === 'true')
      }
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    
    checkAdminStatus()
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkAdminStatus)
      window.addEventListener('adminLogout', checkAdminStatus)
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('keydown', handleKeyDown)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', checkAdminStatus)
        window.removeEventListener('adminLogout', checkAdminStatus)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen])

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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-primary/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image 
                  src="/Logo.png" 
                  alt="Veliora TechWorks" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8" 
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight" style={{ color: '#FFFFFF !important' }}>
                Veliora
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-neon bg-neon/10 border border-neon/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
            
            {isAdmin && (
              <Link
                href="/admin"
                className="ml-4 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary bg-neon hover:bg-neon/90 rounded-lg transition-colors duration-200"
              >
                <Settings size={16} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-95"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="lg:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
              >
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <div className="space-y-1">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            className={`block px-4 py-4 text-base font-medium rounded-lg transition-all duration-200 active:scale-95 ${
                              isActive 
                                ? 'text-neon bg-neon/10 border border-neon/20 shadow-lg' 
                                : 'text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      )
                    })}
                    
                    {isAdmin && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                        className="pt-4 border-t border-white/10 mt-4"
                      >
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-4 py-4 text-base font-medium text-primary bg-neon hover:bg-neon/90 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings size={20} />
                          <span>Admin Dashboard</span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}