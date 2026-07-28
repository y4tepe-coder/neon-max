'use client'

import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Download,
  Globe2,
  ImagePlus,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Smartphone,
} from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'

type Accent = 'lime' | 'blue' | 'orange' | 'sand'
type PackageSize = '5' | '10' | '25+'

type FormState = {
  company: string
  contactName: string
  role: string
  phone: string
  email: string
  website: string
  whatsapp: boolean
  location: string
  bio: string
  accent: Accent
  packageSize: PackageSize
  inquiryName: string
  inquiryEmail: string
  inquiryPhone: string
  note: string
  consent: boolean
  companyWebsite: string
}

const initialState: FormState = {
  company: 'Musterbetrieb GmbH',
  contactName: 'Anna Schneider',
  role: 'Kundenberatung',
  phone: '+49 711 123456',
  email: 'anna@musterbetrieb.de',
  website: 'https://musterbetrieb.de',
  whatsapp: true,
  location: 'Region Stuttgart',
  bio: 'Persönliche Beratung, kurze Wege und ein direkter Draht für Ihre Anfrage.',
  accent: 'lime',
  packageSize: '5',
  inquiryName: '',
  inquiryEmail: '',
  inquiryPhone: '',
  note: '',
  consent: false,
  companyWebsite: '',
}

const accentOptions: Array<{ id: Accent; label: string; value: string; soft: string; ink: string }> = [
  { id: 'lime', label: 'Limette', value: '#C5F74F', soft: '#ECF8CE', ink: '#142000' },
  { id: 'blue', label: 'Kobaltblau', value: '#3E65F3', soft: '#E7ECFF', ink: '#09143C' },
  { id: 'orange', label: 'Signalorange', value: '#FF623D', soft: '#FFE9E2', ink: '#3C1007' },
  { id: 'sand', label: 'Sand', value: '#D8C6A5', soft: '#F4EEE2', ink: '#2D2518' },
]

const packageOptions: Array<{
  id: PackageSize
  label: string
  subline: string
  price: string
}> = [
  { id: '5', label: '5er Starter', subline: '5 Anhänger · 5 Profile', price: '99,99 €' },
  { id: '10', label: '10er Team', subline: '10 Anhänger · 10 Profile', price: '179,90 €' },
  { id: '25+', label: '25+ Stück', subline: 'Für größere Teams', price: 'auf Anfrage' },
]

function safeWebUrl(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    return url.toString()
  } catch {
    return null
  }
}

function safeEmail(value: string) {
  const trimmed = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null
}

function safePhone(value: string) {
  const normalized = value.trim().replace(/[^\d+]/g, '')
  return /^\+?\d{7,16}$/.test(normalized) ? normalized : null
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#63635e]"
    >
      {children}
    </label>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  maxLength = 120,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'url'
  placeholder?: string
  required?: boolean
  maxLength?: number
  autoComplete?: string
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-none border-0 border-b border-[#c9c7bd] bg-transparent px-0 text-[15px] font-medium text-[#141414] outline-none transition-colors placeholder:text-[#99978f] focus:border-[#141414] focus:ring-0"
      />
    </div>
  )
}

function PreviewAction({
  href,
  icon: Icon,
  label,
  accent,
}: {
  href: string
  icon: typeof Phone
  label: string
  accent: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="group flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-transform group-hover:-translate-y-0.5"
        style={{ color: accent }}
      >
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#5b5b55]">
        {label}
      </span>
    </a>
  )
}

function ProfilePreview({
  form,
  avatarUrl,
}: {
  form: FormState
  avatarUrl: string | null
}) {
  const accent = accentOptions.find((option) => option.id === form.accent) ?? accentOptions[0]
  const phone = safePhone(form.phone)
  const email = safeEmail(form.email)
  const website = safeWebUrl(form.website)
  const initials = form.contactName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'AS'

  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="absolute -inset-8 -z-10 rounded-[54px] bg-black/[0.035] blur-3xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-[36px] border-[7px] border-[#151515] bg-[#f7f6f0] shadow-[0_28px_80px_rgba(13,13,13,0.22)]">
        <div className="relative h-36 overflow-hidden bg-[#131313]">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: `radial-gradient(circle at 78% 28%, ${accent.value} 0, transparent 26%), linear-gradient(145deg, #121212 5%, ${accent.ink} 100%)`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
          <div className="absolute left-6 top-6 flex items-center gap-1 text-white">
            <span className="text-[17px] font-black tracking-tight">NEON</span>
            <span className="text-[17px] font-black" style={{ color: accent.value }}>.</span>
            <span className="ml-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">
              Kontakt
            </span>
          </div>
          <div className="absolute bottom-5 right-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Antippen · öffnen · speichern
          </div>
        </div>

        <div className="relative px-6 pb-7">
          <div
            className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[5px] border-[#f7f6f0] text-2xl font-black shadow-lg"
            style={{ background: accent.value, color: accent.ink }}
          >
            {avatarUrl ? (
              // The source is a local browser object URL created from an allowlisted image type.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>

          <div className="pt-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#74736b]">
              {form.company || 'Ihr Unternehmen'}
            </p>
            <h3 className="mt-1 text-[31px] font-black leading-[1.04] tracking-[-0.04em] text-[#121212]">
              {form.contactName || 'Vorname Nachname'}
            </h3>
            <p className="mt-1 text-sm font-semibold" style={{ color: accent.ink }}>
              {form.role || 'Position'}
            </p>
            <p className="mt-4 min-h-[63px] text-[13px] leading-[1.55] text-[#68675f]">
              {form.bio || 'Eine kurze Beschreibung erscheint hier.'}
            </p>
          </div>

          <div className="mt-5 flex justify-between gap-2 border-y border-[#dedcd3] py-4">
            {phone && <PreviewAction href={`tel:${phone}`} icon={Phone} label="Anrufen" accent={accent.ink} />}
            {email && (
              <PreviewAction
                href={`mailto:${encodeURIComponent(email)}`}
                icon={Mail}
                label="E-Mail"
                accent={accent.ink}
              />
            )}
            {form.whatsapp && phone && (
              <PreviewAction
                href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                icon={MessageCircle}
                label="WhatsApp"
                accent={accent.ink}
              />
            )}
            {website && <PreviewAction href={website} icon={Globe2} label="Website" accent={accent.ink} />}
          </div>

          {form.location && (
            <div className="mt-5 flex items-center gap-3 text-xs font-medium text-[#68675f]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.045]">
                <MapPin size={14} />
              </span>
              {form.location}
            </div>
          )}

          <button
            type="button"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition-transform hover:-translate-y-0.5"
            style={{ background: accent.value, color: accent.ink }}
            aria-label="Vorschau: Kontakt speichern"
          >
            <Download size={16} />
            Kontakt speichern
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7a7972]">
        Live-Vorschau · Inhalte ändern sich sofort
      </p>
    </div>
  )
}

export default function NfcConfigurator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const objectUrlRef = useRef<string | null>(null)

  const selectedPackage = useMemo(
    () => packageOptions.find((option) => option.id === form.packageSize) ?? packageOptions[0],
    [form.packageSize],
  )

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  function handleAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    setAvatarError('')
    if (!file) return

    const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
    if (!allowedTypes.has(file.type)) {
      setAvatarError('Bitte JPG, PNG oder WebP verwenden.')
      event.target.value = ''
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setAvatarError('Das Bild darf höchstens 4 MB groß sein.')
      event.target.value = ''
      return
    }

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    const nextUrl = URL.createObjectURL(file)
    objectUrlRef.current = nextUrl
    setAvatarUrl(nextUrl)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/nfc-anfragen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: form.company,
          contactName: form.contactName,
          role: form.role,
          phone: form.phone,
          email: form.email,
          website: form.website,
          whatsapp: form.whatsapp,
          location: form.location,
          bio: form.bio,
          accent: form.accent,
          packageSize: form.packageSize,
          inquiryName: form.inquiryName,
          inquiryEmail: form.inquiryEmail,
          inquiryPhone: form.inquiryPhone,
          note: form.note,
          consent: form.consent,
          companyWebsite: form.companyWebsite,
        }),
      })
      const result = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(result?.error || 'Die Anfrage konnte nicht gesendet werden.')
      }

      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie an hello@neon-bw.de.',
      )
    }
  }

  return (
    <section id="konfigurator" className="border-y border-[#d8d5cb] bg-[#eeece4] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-7 border-b border-[#cbc8bd] pb-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#6c6b64]">
              Konfigurator / 01
            </p>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-[#121212] sm:text-5xl md:text-6xl">
              Bauen Sie Ihre digitale Visitenkarte.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[#5e5d57] lg:justify-self-end">
            Daten eingeben, Farben wählen, Ergebnis direkt sehen. Die Vorschau ist unverbindlich;
            vor der Produktion erhalten Sie immer eine Freigabeansicht.
          </p>
        </div>

        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] xl:gap-16">
          <form onSubmit={handleSubmit} className="order-2 xl:order-1">
            <fieldset className="border-b border-[#cbc8bd] pb-10">
              <legend className="mb-7 flex items-center gap-3 text-sm font-black text-[#171717]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[11px] text-white">
                  1
                </span>
                Profilinhalt
              </legend>
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <TextField
                  id="nfc-company"
                  label="Unternehmen"
                  value={form.company}
                  onChange={(value) => update('company', value)}
                  required
                  autoComplete="organization"
                />
                <TextField
                  id="nfc-name"
                  label="Name"
                  value={form.contactName}
                  onChange={(value) => update('contactName', value)}
                  required
                  autoComplete="name"
                />
                <TextField
                  id="nfc-role"
                  label="Position"
                  value={form.role}
                  onChange={(value) => update('role', value)}
                  autoComplete="organization-title"
                />
                <TextField
                  id="nfc-location"
                  label="Standort"
                  value={form.location}
                  onChange={(value) => update('location', value)}
                  autoComplete="address-level2"
                />
                <TextField
                  id="nfc-phone"
                  label="Telefon"
                  type="tel"
                  value={form.phone}
                  onChange={(value) => update('phone', value)}
                  required
                  autoComplete="tel"
                />
                <TextField
                  id="nfc-email"
                  label="E-Mail"
                  type="email"
                  value={form.email}
                  onChange={(value) => update('email', value)}
                  required
                  autoComplete="email"
                />
                <TextField
                  id="nfc-website"
                  label="Website"
                  type="url"
                  value={form.website}
                  onChange={(value) => update('website', value)}
                  placeholder="ihre-firma.de"
                  autoComplete="url"
                />
                <div className="flex items-end">
                  <label className="flex h-12 w-full cursor-pointer items-center justify-between border-b border-[#c9c7bd] text-sm font-semibold text-[#31312e]">
                    WhatsApp-Schaltfläche
                    <input
                      type="checkbox"
                      checked={form.whatsapp}
                      onChange={(event) => update('whatsapp', event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="relative h-6 w-11 rounded-full bg-[#c4c2b8] transition-colors peer-checked:bg-[#171717]">
                      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
                    </span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="nfc-bio">Kurztext</FieldLabel>
                  <textarea
                    id="nfc-bio"
                    value={form.bio}
                    onChange={(event) => update('bio', event.target.value)}
                    maxLength={280}
                    rows={3}
                    className="w-full resize-none rounded-none border-0 border-b border-[#c9c7bd] bg-transparent px-0 py-2 text-[15px] leading-6 text-[#141414] outline-none placeholder:text-[#99978f] focus:border-[#141414] focus:ring-0"
                  />
                  <p className="mt-2 text-right text-[11px] font-semibold text-[#85837a]">
                    {form.bio.length}/280
                  </p>
                </div>
              </div>
            </fieldset>

            <fieldset className="border-b border-[#cbc8bd] py-10">
              <legend className="mb-7 flex items-center gap-3 text-sm font-black text-[#171717]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[11px] text-white">
                  2
                </span>
                Gestaltung
              </legend>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#63635e]">
                    Akzentfarbe
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {accentOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => update('accent', option.id)}
                        aria-pressed={form.accent === option.id}
                        className={`flex items-center gap-3 border px-3 py-3 text-left text-xs font-bold transition-colors ${
                          form.accent === option.id
                            ? 'border-[#171717] bg-white'
                            : 'border-[#d0cdc3] bg-transparent hover:border-[#929087]'
                        }`}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-black/10"
                          style={{ background: option.value }}
                        />
                        {option.label}
                        {form.accent === option.id && <Check size={14} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#63635e]">
                    Profilfoto
                  </p>
                  <label className="flex min-h-[102px] cursor-pointer items-center gap-4 border border-dashed border-[#b7b4aa] bg-white/45 p-4 transition-colors hover:border-[#171717] hover:bg-white">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#171717] text-white">
                      <ImagePlus size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#171717]">
                        Bild für die Vorschau wählen
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#74736c]">
                        JPG, PNG oder WebP · max. 4 MB · bleibt lokal im Browser
                      </span>
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAvatar}
                      className="sr-only"
                    />
                  </label>
                  {avatarError && <p className="mt-2 text-xs font-semibold text-red-700">{avatarError}</p>}
                </div>
              </div>
            </fieldset>

            <fieldset className="border-b border-[#cbc8bd] py-10">
              <legend className="mb-7 flex items-center gap-3 text-sm font-black text-[#171717]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[11px] text-white">
                  3
                </span>
                Paket
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {packageOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => update('packageSize', option.id)}
                    aria-pressed={form.packageSize === option.id}
                    className={`relative min-h-[132px] border p-4 text-left transition-all ${
                      form.packageSize === option.id
                        ? 'border-[#171717] bg-[#171717] text-white'
                        : 'border-[#cbc8bd] bg-white/50 text-[#171717] hover:border-[#77756d]'
                    }`}
                  >
                    {form.packageSize === option.id && (
                      <CheckCircle2 size={17} className="absolute right-4 top-4 text-[#C5F74F]" />
                    )}
                    <span className="block text-sm font-black">{option.label}</span>
                    <span
                      className={`mt-2 block text-xs ${
                        form.packageSize === option.id ? 'text-white/55' : 'text-[#75736b]'
                      }`}
                    >
                      {option.subline}
                    </span>
                    <span
                      className={`mt-5 block text-lg font-black ${
                        form.packageSize === option.id ? 'text-[#C5F74F]' : ''
                      }`}
                    >
                      {option.price}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="pt-10">
              <legend className="mb-7 flex items-center gap-3 text-sm font-black text-[#171717]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[11px] text-white">
                  4
                </span>
                Unverbindlich anfragen
              </legend>
              <div className="mb-7 border border-[#cbc8bd] bg-white/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#6f6d66]">
                      Ihre Auswahl
                    </p>
                    <p className="mt-1 text-lg font-black text-[#171717]">{selectedPackage.label}</p>
                  </div>
                  <p className="text-2xl font-black text-[#171717]">{selectedPackage.price}</p>
                </div>
                <p className="mt-4 border-t border-[#d9d6cc] pt-4 text-xs leading-5 text-[#706f68]">
                  Anfrage statt Sofortkauf: Wir prüfen Logo, Profile und Lieferumfang und bestätigen
                  den endgültigen Preis vor dem Auftrag. Versand kommt nach Aufwand hinzu.
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <TextField
                  id="inquiry-name"
                  label="Ihr Name"
                  value={form.inquiryName}
                  onChange={(value) => update('inquiryName', value)}
                  required
                  autoComplete="name"
                />
                <TextField
                  id="inquiry-email"
                  label="Ihre E-Mail"
                  type="email"
                  value={form.inquiryEmail}
                  onChange={(value) => update('inquiryEmail', value)}
                  required
                  autoComplete="email"
                />
                <TextField
                  id="inquiry-phone"
                  label="Telefon (optional)"
                  type="tel"
                  value={form.inquiryPhone}
                  onChange={(value) => update('inquiryPhone', value)}
                  autoComplete="tel"
                />
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label htmlFor="company-website">Company website</label>
                  <input
                    id="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.companyWebsite}
                    onChange={(event) => update('companyWebsite', event.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="inquiry-note">Wunsch oder Rückfrage (optional)</FieldLabel>
                  <textarea
                    id="inquiry-note"
                    value={form.note}
                    onChange={(event) => update('note', event.target.value)}
                    maxLength={1000}
                    rows={3}
                    placeholder="Zum Beispiel: fünf Mitarbeiter, schwarzer Anhänger, Logo auf Vorderseite."
                    className="w-full resize-none rounded-none border-0 border-b border-[#c9c7bd] bg-transparent px-0 py-2 text-[15px] leading-6 text-[#141414] outline-none placeholder:text-[#99978f] focus:border-[#141414] focus:ring-0"
                  />
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#66655e]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => update('consent', event.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#171717]"
                />
                <span>
                  Ich stimme zu, dass NEON meine Angaben zur Bearbeitung der Anfrage verarbeitet.
                  Details stehen in der{' '}
                  <Link href="/datenschutz" target="_blank" className="font-bold text-[#171717] underline">
                    Datenschutzerklärung
                  </Link>
                  .
                </span>
              </label>

              {status === 'success' ? (
                <div
                  role="status"
                  className="mt-7 flex items-start gap-4 border border-[#9faf76] bg-[#edf5d9] p-5"
                >
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-[#486000]" />
                  <div>
                    <p className="font-black text-[#233000]">Anfrage ist angekommen.</p>
                    <p className="mt-1 text-sm leading-6 text-[#506025]">
                      Sie erhalten innerhalb von 24 Stunden eine persönliche Rückmeldung mit den
                      nächsten Schritten.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {status === 'error' && (
                    <p role="alert" className="mt-6 border-l-2 border-red-700 pl-3 text-sm text-red-800">
                      {errorMessage}{' '}
                      <a href="mailto:hello@neon-bw.de" className="font-bold underline">
                        Alternativ direkt per E-Mail schreiben.
                      </a>
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#171717] px-6 text-sm font-black text-white transition-colors hover:bg-[#2a2a27] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Wird gesendet
                      </>
                    ) : (
                      <>
                        Anfrage mit Auswahl senden
                        <Send size={17} className="transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </>
              )}
            </fieldset>
          </form>

          <aside className="order-1 xl:sticky xl:top-28 xl:order-2">
            <ProfilePreview form={form} avatarUrl={avatarUrl} />
            <div className="mx-auto mt-7 max-w-[390px] border border-[#d2cfc5] bg-white/55 p-5">
              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-[#171717]" />
                <p className="text-sm font-black text-[#171717]">Echtes Live-Beispiel</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#6d6c65]">
                Sehen Sie die fertige NEON-Visitenkarte ohne Website-Navigation und testen Sie den
                Kontakt-Download.
              </p>
              <Link
                href="/v/yasin-tepe"
                target="_blank"
                className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.11em] text-[#171717]"
              >
                Beispiel öffnen
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
