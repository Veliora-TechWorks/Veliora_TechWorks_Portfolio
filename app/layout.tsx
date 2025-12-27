import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Veliora TechWorks - Innovating Beyond Boundaries',
  description: 'Premium technology solutions and digital innovation by Veliora TechWorks',
  keywords: 'technology, innovation, web development, digital solutions, premium tech',
  icons: {
    icon: '/Favicon.jpg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-secondary min-h-screen font-sans">
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}