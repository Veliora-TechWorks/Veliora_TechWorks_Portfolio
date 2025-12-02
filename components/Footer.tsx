import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-gradient border-t border-accent/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/login" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <Image src="/Logo.png" alt="Veliora TechWorks" width={32} height={32} className="w-8 h-8" />
              <span className="metallic-text font-bold text-xl">Veliora TechWorks</span>
            </Link>
            <p className="text-accent mb-4 max-w-md">
              Innovating beyond boundaries with premium technology solutions and digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/VelioraTechWorks" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Github size={20} />
              </Link>
              <Link href="#" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Mail size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-accent hover:text-secondary transition-colors">About</Link></li>
              <li><Link href="/services" className="text-accent hover:text-secondary transition-colors">Services</Link></li>
              <li><Link href="/projects" className="text-accent hover:text-secondary transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-accent hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-accent">Web Development</span></li>
              <li><span className="text-accent">UI/UX Design</span></li>
              <li><span className="text-accent">Business Analysis</span></li>
              <li><span className="text-accent">Digital Marketing</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-8 pt-8 text-center">
          <p className="text-accent">
            © 2025 Veliora TechWorks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}