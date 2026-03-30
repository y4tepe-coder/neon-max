import Hero from '@/components/home/Hero'
import ProblemSection from '@/components/home/ProblemSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import WhyNeon from '@/components/home/WhyNeon'
import WebsiteCheck from '@/components/home/WebsiteCheck'
import ProcessSection from '@/components/home/ProcessSection'
import FounderSection from '@/components/home/FounderSection'
import FAQ from '@/components/home/FAQ'
import ClosingCTA from '@/components/home/ClosingCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ServicesOverview />
      <WebsiteCheck />
      <WhyNeon />
      <ProcessSection />
      <FounderSection />
      <FAQ />
      <ClosingCTA />
    </>
  )
}
