import Hero from '@/components/home/Hero'
import { MarqueeBanner } from '@/components/ui/marquee-banner'
import ZeitSparen from '@/components/home/ZeitSparen'
import ProblemSection from '@/components/home/ProblemSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import WebsiteCheck from '@/components/home/WebsiteCheck'
import ProcessSection from '@/components/home/ProcessSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import StatsSection from '@/components/home/StatsSection'
import FounderSection from '@/components/home/FounderSection'
import FAQ from '@/components/home/FAQ'
import ClosingCTA from '@/components/home/ClosingCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <ZeitSparen />
      <ProblemSection />
      <ServicesOverview />
      <WebsiteCheck />
      <ProcessSection />
      <PortfolioSection />
      <StatsSection />
      <FounderSection />
      <FAQ />
      <ClosingCTA />
    </>
  )
}
