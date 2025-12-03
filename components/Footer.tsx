import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-gradient border-t border-accent/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        {/* Mobile/Tablet Layout */}
        <div className="block md:hidden space-y-8">
          {/* Brand Section */}
          <div className="text-center">
            <Link href="/login" className="flex items-center justify-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
              <Image src="/Logo.png" alt="Veliora TechWorks" width={32} height={32} className="w-8 h-8" />
              <span className="metallic-text font-bold text-xl">Veliora TechWorks</span>
            </Link>
            <p className="text-accent mb-6 text-center">
              Innovating beyond boundaries with premium technology solutions and digital experiences.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="https://github.com/Veliora-TechWorks" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Github size={24} />
              </Link>
              <Link href="https://www.linkedin.com/company/veliora-techworks/" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Linkedin size={24} />
              </Link>
              <Link href="https://x.com/VelioraTech?t=FOh9nel2eQQJaSxyryYM3g&s=09" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Twitter size={24} />
              </Link>
              <Link href="https://www.instagram.com/velioratechworks?igsh=MWlvZ3dhYmg2OWJjdA==" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Instagram size={24} />
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-4 text-secondary">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-accent hover:text-secondary transition-colors">About</Link></li>
                <li><Link href="/services" className="text-accent hover:text-secondary transition-colors">Services</Link></li>
                <li><Link href="/projects" className="text-accent hover:text-secondary transition-colors">Projects</Link></li>
                <li><Link href="/contact" className="text-accent hover:text-secondary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-4 text-secondary">Services</h3>
              <ul className="space-y-3">
                <li><span className="text-accent">Web Development</span></li>
                <li><span className="text-accent">UI/UX Design</span></li>
                <li><span className="text-accent">Business Analysis</span></li>
                <li><span className="text-accent">Digital Marketing</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/login" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <Image src="/Logo.png" alt="Veliora TechWorks" width={32} height={32} className="w-8 h-8" />
              <span className="metallic-text font-bold text-xl">Veliora TechWorks</span>
            </Link>
            <p className="text-accent mb-4 max-w-md">
              Innovating beyond boundaries with premium technology solutions and digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/Veliora-TechWorks" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Github size={20} />
              </Link>
              <Link href="https://www.linkedin.com/company/veliora-techworks/" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Linkedin size={20} />
              </Link>
              <Link href="https://x.com/VelioraTech?t=FOh9nel2eQQJaSxyryYM3g&s=09" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Twitter size={20} />
              </Link>
              <Link href="https://www.instagram.com/velioratechworks?igsh=MWlvZ3dhYmg2OWJjdA==" className="text-accent hover:text-neon transition-colors" target='blank'>
                <Instagram size={20} />
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

        <div className="border-t border-accent/20 mt-12 pt-8 text-center">
          <p className="text-accent">
            © 2025 Veliora TechWorks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}