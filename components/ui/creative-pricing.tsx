import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PricingTier {
  name: string
  icon: React.ReactNode
  monthlyPrice: string
  setupPrice: string
  description: string
  features: string[]
  popular?: boolean
  badge?: string
}

export function CreativePricing({
  tag = 'Leistungen & Preise',
  title = 'Das richtige Paket für Ihr Unternehmen',
  description = 'Transparent kalkuliert, ohne versteckte Kosten.',
  tiers,
}: {
  tag?: string
  title?: string
  description?: string
  tiers: PricingTier[]
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="font-handwritten text-xl text-neon-dim rotate-[-1deg] inline-block mb-4">
          {tag}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-off-white mb-4 leading-tight tracking-tight">
          {title}
        </h2>
        <p className="font-handwritten text-xl text-white/50 rotate-[-0.5deg] inline-block">
          {description}
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              'relative group transition-all duration-300',
              index === 0 && 'rotate-[-1deg]',
              index === 1 && 'rotate-[1deg]',
              index === 2 && 'rotate-[-1.5deg]'
            )}
          >
            {/* Card background with offset shadow */}
            <div
              className={cn(
                'absolute inset-0 rounded-2xl',
                'border-2 bg-off-white',
                'transition-all duration-300',
                'group-hover:shadow-[8px_8px_0px_0px]',
                'group-hover:translate-x-[-4px]',
                'group-hover:translate-y-[-4px]',
                tier.popular
                  ? 'border-text-dark shadow-[4px_4px_0px_0px] shadow-neon'
                  : 'border-text-dark shadow-[4px_4px_0px_0px] shadow-text-dark'
              )}
            />

            <div className="relative p-6">
              {/* Popular badge */}
              {tier.badge && (
                <div
                  className="absolute -top-3 -right-3 bg-neon text-text-dark
                  font-handwritten font-bold px-3 py-1 rounded-full rotate-12 text-sm border-2 border-text-dark z-10"
                >
                  {tier.badge}
                </div>
              )}

              {/* Icon + Name */}
              <div className="mb-5">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full mb-4',
                    'flex items-center justify-center',
                    'border-2 border-text-dark',
                    tier.popular ? 'bg-neon text-text-dark' : 'bg-warm-gray text-text-dark'
                  )}
                >
                  {tier.icon}
                </div>
                <h3 className="font-handwritten text-2xl font-bold text-text-dark leading-tight">
                  {tier.name}
                </h3>
                <p className="font-handwritten text-base text-text-muted mt-0.5">
                  {tier.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-1.5">
                <div className="flex items-baseline gap-1">
                  <span className="font-handwritten text-4xl font-bold text-text-dark">
                    {tier.monthlyPrice}
                  </span>
                  <span className="font-handwritten text-text-muted text-base">/ Monat</span>
                </div>
                <p className="text-text-muted text-sm mt-1">
                  + {tier.setupPrice} einmalig
                </p>
              </div>
              <p className="text-text-muted/60 text-xs mb-6">12 Monate Mindestlaufzeit</p>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-text-dark/15 mb-5" />

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 border-text-dark flex items-center justify-center shrink-0',
                        tier.popular ? 'bg-neon' : 'bg-warm-gray'
                      )}
                    >
                      <Check className="w-3 h-3 text-text-dark" strokeWidth={3} />
                    </div>
                    <span className="font-handwritten text-lg text-text-dark leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/kontakt"
                className={cn(
                  'block w-full text-center font-handwritten text-lg font-semibold py-3 px-5 rounded-xl',
                  'border-2 border-text-dark',
                  'transition-all duration-200',
                  'shadow-[3px_3px_0px_0px]',
                  'hover:shadow-[5px_5px_0px_0px]',
                  'hover:translate-x-[-2px] hover:translate-y-[-2px]',
                  tier.popular
                    ? 'bg-neon text-text-dark shadow-text-dark hover:bg-neon-dim'
                    : 'bg-white text-text-dark shadow-text-dark hover:bg-warm-gray'
                )}
              >
                {tier.name} anfragen
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
