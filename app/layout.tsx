import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veliora TechWorks - Innovating Beyond Boundaries',
  description: 'Premium technology solutions and digital innovation by Veliora TechWorks',
  keywords: 'technology, innovation, web development, digital solutions, premium tech',
  icons: {
    icon: '/Favicon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-secondary min-h-screen`}>
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}