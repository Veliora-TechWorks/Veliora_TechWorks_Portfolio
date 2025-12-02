import { Hero } from '@/components/sections/Hero'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { FloatingCards } from '@/components/sections/FloatingCards'

export default function Home() {
  return (
    <>
      <Hero />
      <FloatingCards />
      <FeaturesSection />
      <TechStackSection />
      <StatsSection />
    </>
  )
}