'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Globe, BarChart2, Zap } from 'lucide-react'
import { CreativePricing, PricingTier } from '@/components/ui/creative-pricing'

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    icon: <Globe className="w-5 h-5" />,
    monthlyPrice: '50 €',
    setupPrice: '500 €',
    description: 'Professioneller Einstieg.',
    features: [
      'Moderne One-Pager Website',
      'Local SEO Grundsetup',
      'Smartes Kontaktformular',
      'Hosting & Wartung',
    ],
  },
  {
    name: 'Business',
    icon: <BarChart2 className="w-5 h-5" />,
    monthlyPrice: '89 €',
    setupPrice: '850 €',
    description: 'Für Unternehmen, die wachsen.',
    features: [
      'Multi-Page Website (bis 5 Seiten)',
      'Erweitertes Local SEO',
      'Automatisierte Terminbuchung',
      'WhatsApp/E-Mail-Erinnerungen',
      'Hosting & Wartung',
    ],
    popular: true,
    badge: 'Am beliebtesten',
  },
  {
    name: 'Premium',
    icon: <Zap className="w-5 h-5" />,
    monthlyPrice: '139 €',
    setupPrice: '1.750 €',
    description: 'Maximale Automatisierung.',
    features: [
      'Umfassende Website (bis 10 Seiten)',
      'KI-Chatbot für 24/7 Support',
      'KI-Telefonassistent (optional)',
      'Alle Automatisierungen',
      'Priorisierter Support',
      'Hosting & Wartung',
    ],
  },
]

export default function ServicesOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-dark-bg" id="leistungen" aria-labelledby="services-heading">
      <div ref={ref} className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <CreativePricing
            tag="Leistungen & Preise"
            title="Das richtige Paket für Ihr Unternehmen"
            description="Klar kalkuliert – von der Erstellung bis zur laufenden Betreuung."
            tiers={tiers}
          />
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 font-medium text-sm transition-colors duration-200"
          >
            Vollständige Leistungsübersicht
            <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
