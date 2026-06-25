import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import LogosSection from '@/components/sections/LogosSection'
import ProcessSection from '@/components/sections/ProcessSection'
import AboutSection from '@/components/sections/AboutSection'
import PackageSection from '@/components/sections/PackageSection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <LogosSection />
        <ProcessSection />
        <AboutSection />
        <PackageSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
