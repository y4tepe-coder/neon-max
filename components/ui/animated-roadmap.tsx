'use client'

import * as React from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'

export interface Milestone {
  id: number
  name: string
  status: 'complete' | 'in-progress' | 'pending'
  /** CSS percentage values, must match SVG coordinates (see viewBox comment) */
  position: { top: string; left: string }
  description: string
  /** Show a "Termin buchen" CTA button in the tooltip */
  cta?: boolean
  /** Called when the CTA button is clicked */
  onCtaClick?: () => void
  /** Which side the tooltip appears on */
  tooltipSide?: 'top' | 'bottom'
  /** Horizontal alignment of the tooltip relative to the dot */
  tooltipAlign?: 'left' | 'center' | 'right'
}

interface AnimatedRoadmapProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: Milestone[]
}

// ─── Milestone marker ─────────────────────────────────────────────────────────

function MilestoneMarker({ milestone }: { milestone: Milestone }) {
  const [isHovered, setIsHovered] = React.useState(false)
  const hideTimer = React.useRef<ReturnType<typeof setTimeout>>()

  const onEnter = () => {
    clearTimeout(hideTimer.current)
    setIsHovered(true)
  }
  const onLeave = () => {
    hideTimer.current = setTimeout(() => setIsHovered(false), 120)
  }

  React.useEffect(() => () => clearTimeout(hideTimer.current), [])

  // Progressive fade: step 1 = full brightness, step 5 = 30%
  const dotOpacity = 1 - (milestone.id - 1) * 0.175
  const dotColor = `rgba(197,247,79,${dotOpacity})`

  const side = milestone.tooltipSide ?? 'top'
  const align = milestone.tooltipAlign ?? 'center'

  const tooltipClass = cn(
    'absolute z-50 w-60 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 pointer-events-auto',
    // Vertical placement
    side === 'top' ? 'bottom-full mb-4' : 'top-full mt-4',
    // Horizontal alignment
    align === 'center' && 'left-1/2 -translate-x-1/2',
    align === 'right' && 'left-0',
    align === 'left' && 'right-0'
  )

  return (
    <div
      className="absolute"
      style={{ top: milestone.position.top, left: milestone.position.left }}
    >
      {/* Centered wrapper */}
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, scale: 0.92, y: side === 'top' ? 6 : -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: side === 'top' ? 6 : -6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className={tooltipClass}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: '#A8D93A' }}
              >
                Schritt {milestone.id}
              </p>
              <h4 className="font-bold text-sm text-slate-900 mb-2">{milestone.name}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{milestone.description}</p>

              {milestone.cta && (
                <button
                  type="button"
                  onClick={milestone.onCtaClick}
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold
                             px-4 py-2.5 rounded-full w-full transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: '#C5F74F', color: '#111111' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = '#A8D93A'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = '#C5F74F'
                  }}
                >
                  <Calendar size={13} aria-hidden="true" />
                  Termin buchen
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dot hit area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: milestone.id * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          viewport={{ once: true }}
          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none"
          style={{
            background: `radial-gradient(circle, rgba(197,247,79,${dotOpacity * 0.18}) 0%, transparent 70%)`,
          }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div
            className="w-5 h-5 rounded-full border-2 transition-all duration-300"
            style={{
              backgroundColor: dotColor,
              borderColor: dotColor,
              boxShadow: isHovered
                ? `0 0 28px rgba(197,247,79,${dotOpacity * 0.9}), 0 0 10px rgba(197,247,79,${dotOpacity * 0.5})`
                : `0 0 14px rgba(197,247,79,${dotOpacity * 0.45})`,
            }}
          />
        </motion.div>

        {/* Always-visible name label */}
        <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
          <span
            className="text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-200"
            style={{
              backgroundColor: isHovered ? '#C5F74F' : 'rgba(255,255,255,0.07)',
              color: isHovered ? '#111111' : 'rgba(255,255,255,0.55)',
              border: `1px solid ${isHovered ? '#C5F74F' : 'rgba(255,255,255,0.10)'}`,
            }}
          >
            {milestone.name}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

/**
 * SVG viewBox is "0 0 800 400".
 * Container height is 480px, so the mapping is:
 *   SVG y = (CSS top% / 100) * (400/480 * containerHeight_px)
 *         = (CSS top% / 100) * 400   [when container = 480px]
 *
 * Milestone CSS positions → SVG path coordinates (used in <path d="…">):
 *   left 7.50%  / top 80.00% → SVG (60,  320)
 *   left 22.50% / top 16.00% → SVG (180,  64)
 *   left 43.75% / top 56.00% → SVG (350, 224)
 *   left 63.75% / top  9.50% → SVG (510,  38)
 *   left 94.75% / top 48.75% → SVG (758, 195)
 */
const AnimatedRoadmap = React.forwardRef<HTMLDivElement, AnimatedRoadmapProps>(
  ({ className, milestones, ...props }, _ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: '-100px' })

    return (
      <div ref={containerRef} className={cn('relative w-full', className)} {...props}>
        {/* Horizontal scroll wrapper on narrow viewports */}
        <div className="overflow-x-auto">
          <div className="relative h-[480px] min-w-[640px]">
            {/* Animated SVG path */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
              className="absolute inset-0"
              aria-hidden="true"
            >
              {/* Soft glow layer */}
              <motion.path
                d="M 60 320 C 100 200, 140 70, 180 64 S 300 210, 350 224 S 470 60, 510 38 S 660 165, 758 195"
                fill="none"
                stroke="#C5F74F"
                strokeWidth="14"
                strokeLinecap="round"
                strokeOpacity="0.07"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ pathLength: { duration: 2.2, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
              />
              {/* Main dashed trail */}
              <motion.path
                d="M 60 320 C 100 200, 140 70, 180 64 S 300 210, 350 224 S 470 60, 510 38 S 660 165, 758 195"
                fill="none"
                stroke="#C5F74F"
                strokeWidth="2"
                strokeDasharray="10 7"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ pathLength: { duration: 2.2, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
              />
            </svg>

            {milestones.map((milestone) => (
              <MilestoneMarker key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      </div>
    )
  }
)

AnimatedRoadmap.displayName = 'AnimatedRoadmap'
export { AnimatedRoadmap }
