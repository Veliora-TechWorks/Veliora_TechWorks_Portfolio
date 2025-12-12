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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    const checkAdminStatus = () => {
      if (typeof window !== 'undefined') {
        const adminStatus = localStorage.getItem('isAdminLoggedIn')
        setIsAdmin(adminStatus === 'true')
      }
    }
    
    // Check admin login status on mount
    checkAdminStatus()
    
    // Listen for storage changes and custom logout event
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkAdminStatus)
      window.addEventListener('adminLogout', checkAdminStatus)
      window.addEventListener('scroll', handleScroll)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', checkAdminStatus)
        window.removeEventListener('adminLogout', checkAdminStatus)
        window.removeEventListener('scroll', handleScroll)
      }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-primary/80 backdrop-blur-2xl border-b border-neon/30 shadow-2xl shadow-neon/20' 
          : 'bg-gradient-to-b from-primary/60 to-transparent backdrop-blur-sm'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-purple/5 to-neon/5 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-3">
        <div className="flex items-center justify-between h-20 md:h-18">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-neon/20 rounded-full blur-md group-hover:bg-neon/40 transition-all duration-500" />
                <Image 
                  src="/Logo.png" 
                  alt="Veliora TechWorks" 
                  width={40} 
                  height={40} 
                  className="w-10 h-10 relative z-10 drop-shadow-2xl" 
                />
              </motion.div>
              <div className="relative">
                <span className="bg-metallic-gradient bg-clip-text text-transparent font-bold text-xl tracking-wide group-hover:drop-shadow-lg transition-all duration-500">
                  Veliora
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-neon/0 via-neon/20 to-neon/0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-500 group overflow-hidden ${
                      isActive 
                        ? 'text-primary bg-neon shadow-lg shadow-neon/30 border border-neon/50' 
                        : 'text-secondary hover:text-neon hover:bg-accent/10 border border-transparent hover:border-neon/30'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-neon via-neon/80 to-neon rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-neon/0 via-neon/10 to-neon/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    )}
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-neon to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                  </Link>
                </motion.div>
              )
            })}
            {isAdmin && (
              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="ml-6 relative"
              >
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 px-4 py-2 text-primary bg-gradient-to-r from-neon to-purple hover:from-neon/90 hover:to-purple/90 rounded-xl transition-all duration-500 font-semibold border border-neon/50 shadow-lg shadow-neon/20 hover:shadow-neon/40 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Settings size={16} className="relative z-10" />
                  <span className="relative z-10">Dashboard</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative hover:bg-neon/10 transition-all duration-300 border border-accent/20 hover:border-neon/40 rounded-xl backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon/5 to-purple/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden relative mt-4 p-6 bg-primary/90 backdrop-blur-2xl border border-neon/30 shadow-2xl shadow-neon/20 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-purple/5 to-neon/10" />
              <div className="relative space-y-3">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className={`relative block py-4 px-5 rounded-xl transition-all duration-500 font-medium overflow-hidden group ${
                          isActive 
                            ? 'text-primary bg-neon border border-neon/50 shadow-lg shadow-neon/30' 
                            : 'text-secondary hover:text-neon hover:bg-accent/10 border border-transparent hover:border-neon/30 hover:translate-x-2'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-neon/0 via-neon/10 to-neon/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1, duration: 0.4 }}
                    className="pt-4 border-t border-neon/20"
                  >
                    <Link
                      href="/admin"
                      className="flex items-center space-x-3 py-4 px-5 text-primary bg-gradient-to-r from-neon to-purple rounded-xl transition-all duration-500 font-semibold shadow-lg shadow-neon/20 hover:shadow-neon/40 group overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Settings size={18} className="relative z-10" />
                      <span className="relative z-10">Dashboard</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}