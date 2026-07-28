'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Building2,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRoundPlus,
  type LucideIcon,
} from 'lucide-react'
import type { NfcProfile } from '@/lib/nfc-profiles'

interface DigitalProfileProps {
  profile: NfcProfile
}

interface DirectAction {
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
}

export default function DigitalProfile({ profile }: DigitalProfileProps) {
  const [showProfileImage, setShowProfileImage] = useState(
    Boolean(profile.profileImage)
  )

  const directActions: DirectAction[] = [
    {
      label: 'Anrufen',
      href: `tel:${profile.phone.international}`,
      icon: Phone,
    },
    {
      label: 'E-Mail',
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: 'Website',
      href: profile.website.href,
      icon: Globe2,
      external: true,
    },
    {
      label: 'WhatsApp',
      href: profile.whatsappHref,
      icon: MessageCircle,
      external: true,
    },
  ]

  return (
    <div className="fixed inset-0 z-[10000] overflow-y-auto overscroll-y-contain bg-[#dfe4dc] text-[#111713] [padding-bottom:env(safe-area-inset-bottom)] [padding-top:env(safe-area-inset-top)]">
      <article className="relative mx-auto min-h-full w-full max-w-[460px] overflow-hidden bg-[#f8f8f3] shadow-[0_0_80px_rgba(18,28,20,0.18)]">
        <header className="relative h-[190px] overflow-hidden bg-[#172019]">
          <img
            src={profile.coverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,9,0.16)_0%,rgba(8,14,9,0.78)_100%)]"
          />

          <a
            href="https://neon-bw.de"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-5 top-5 inline-flex items-center rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-black/35"
            aria-label="NEON BW Website öffnen"
          >
            NEON<span className="text-[#c5f74f]">.</span>BW
          </a>

          <p className="absolute bottom-4 right-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Region Stuttgart
          </p>
        </header>

        <div className="relative px-5 pb-8 sm:px-7">
          <div className="-mt-[58px] flex justify-center">
            <div
              className="relative flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-[34px] border-[5px] border-[#f8f8f3] bg-[#172019] shadow-[0_14px_30px_rgba(15,25,17,0.22)]"
              aria-label={`Profilbild von ${profile.displayName}`}
            >
              <span className="text-3xl font-bold tracking-tight text-[#c5f74f]">
                {profile.initials}
              </span>
              {profile.profileImage && showProfileImage && (
                <img
                  src={profile.profileImage}
                  alt={profile.displayName}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() => setShowProfileImage(false)}
                />
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-[32px] font-bold leading-tight tracking-[-0.035em] text-[#111713]">
              {profile.displayName}
            </h1>
            <p className="mt-1.5 text-[15px] font-medium text-[#536057]">
              {profile.role} · {profile.company}
            </p>
          </div>

          <nav
            className="mt-7 grid grid-cols-4 gap-2"
            aria-label="Direkte Kontaktmöglichkeiten"
          >
            {directActions.map((action) => {
              const Icon = action.icon

              return (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  className="group flex min-w-0 flex-col items-center gap-2 rounded-[18px] border border-[#dfe4dc] bg-white px-1.5 py-3.5 shadow-[0_5px_18px_rgba(20,30,22,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#bedf67] focus-visible:outline-[#8bb330]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#edf7d4] text-[#324413] transition-colors group-hover:bg-[#c5f74f]">
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <span className="max-w-full truncate text-[11px] font-semibold text-[#3c483f]">
                    {action.label}
                  </span>
                </a>
              )
            })}
          </nav>

          <section
            className="mt-6 rounded-[24px] border border-[#e0e4de] bg-white p-5 shadow-[0_12px_35px_rgba(20,30,22,0.05)]"
            aria-labelledby="profile-about"
          >
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#172019] text-[#c5f74f]">
                <Building2 size={17} strokeWidth={2} />
              </span>
              <div>
                <h2
                  id="profile-about"
                  className="text-sm font-bold uppercase tracking-[0.12em] text-[#202a22]"
                >
                  {profile.company}
                </h2>
                <p className="mt-2 text-[14px] leading-6 text-[#5b675e]">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3.5 border-t border-[#e8ebe6] pt-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf7d4] text-[#405719]">
                <MapPin size={17} strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#849087]">
                  Standort
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#2f3a31]">
                  {profile.region}
                </p>
              </div>
            </div>
          </section>

          <a
            href={`/v/${encodeURIComponent(profile.slug)}/contact.vcf`}
            download={`${profile.slug}.vcf`}
            className="group mt-5 flex w-full items-center justify-between rounded-[22px] bg-[#172019] px-5 py-4 text-white shadow-[0_14px_30px_rgba(18,27,20,0.22)] transition duration-200 hover:bg-[#202c22] focus-visible:outline-[#8bb330]"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#c5f74f] text-[#172019]">
                <UserRoundPlus size={21} strokeWidth={2.2} />
              </span>
              <span className="text-left">
                <span className="block text-[15px] font-bold">Kontakt speichern</span>
                <span className="mt-0.5 block text-[11px] text-white/55">
                  Als digitale Visitenkarte
                </span>
              </span>
            </span>
            <ArrowUpRight
              size={20}
              strokeWidth={1.8}
              className="text-white/55 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c5f74f]"
            />
          </a>

          <footer className="pb-2 pt-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#879188]">
              Digitale Visitenkarte von{' '}
              <a
                href="https://neon-bw.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#526527] underline decoration-[#c5f74f] decoration-2 underline-offset-4"
              >
                NEON BW
              </a>
            </p>
          </footer>
        </div>
      </article>
    </div>
  )
}
