import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── New design system ──────────────────────────────
        'bg-primary':   '#0A0F1E',
        'bg-card':      '#0F1629',
        'bg-elevated':  '#141B2D',
        indigo: {
          DEFAULT: '#6366F1',
          dim:     '#4F52D6',
          glow:    'rgba(99,102,241,0.25)',
          subtle:  'rgba(99,102,241,0.08)',
          border:  'rgba(99,102,241,0.25)',
        },
        sky: {
          DEFAULT: '#38BDF8',
          subtle:  'rgba(56,189,248,0.12)',
        },
        'accent-neon':  '#CCFF00',
        'text-primary': '#F8FAFC',
        'text-soft':    'rgba(248,250,252,0.6)',
        'text-faint':   'rgba(248,250,252,0.35)',
        'border-dim':   'rgba(99,102,241,0.2)',
        // ── Legacy (kept for existing components) ─────────
        neon: '#C5F74F',
        'neon-dim': '#A8D93A',
        'dark-bg': '#131313',
        'dark-card': '#1C1C1C',
        'dark-border': '#2A2A2A',
        'off-white': '#F8F7F4',
        'warm-gray': '#F0EFE9',
        'card-bg': '#FFFFFF',
        'text-dark': '#111111',
        'text-muted': '#6B6B6B',
        'text-light': '#F8F7F4',
        'border-light': '#E5E3DE',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        handwritten: ['var(--font-caveat)', 'Caveat', 'cursive'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-sm': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197,247,79,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(197,247,79,0.6)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
