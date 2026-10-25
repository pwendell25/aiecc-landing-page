import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import RehookSection from '@/components/sections/RehookSection'
import FitSection from '@/components/sections/FitSection'
import AboutSection from '@/components/sections/AboutSection'
import LogosSection from '@/components/sections/LogosSection'
import ProcessSection from '@/components/sections/ProcessSection'
import VideoSection from '@/components/sections/VideoSection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import TestimonialWall from '@/components/sections/TestimonialWall'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hook → rehook → who it's for → about → proof */}
        <HeroSection />
        <ProblemSection />
        <RehookSection />
        <FitSection />
        <AboutSection />
        <LogosSection />
        <ProcessSection />
        <VideoSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
        <TestimonialWall />
      </main>
      <Footer />
    </>
  )
}
