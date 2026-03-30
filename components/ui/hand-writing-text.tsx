'use client'

import { motion } from 'framer-motion'

interface HandWrittenTitleProps {
  title?: string
  subtitle?: string
}

function HandWrittenTitle({
  title = 'Hand Written',
  subtitle = 'Optional subtitle',
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
        opacity: { duration: 0.5 },
      },
    },
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="absolute inset-0 pointer-events-none">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
          aria-hidden="true"
        >
          <motion.path
            d="M 950 90
               C 1250 300, 1050 480, 600 520
               C 250 520, 150 480, 150 300
               C 150 120, 350 80, 600 80
               C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="10"
            stroke="#C5F74F"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="opacity-60"
          />
        </motion.svg>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl text-off-white font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-lg text-white/55 mt-4 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}

export { HandWrittenTitle }
