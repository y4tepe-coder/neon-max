'use client'
import React, { useRef } from 'react'
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion'

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Spring-glättet scrollYProgress, damit iOS-Momentum keine Sprünge macht.
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 80,
    restDelta: 0.001,
  })

  const rotateRange = isMobile ? [12, 0] : [20, 0]
  const scaleRange = isMobile ? [0.88, 0.96] : [1.05, 1]
  const translateRange = isMobile ? [0, -40] : [0, -100]

  const rotate = useTransform(smoothProgress, [0, 1], rotateRange)
  const scale = useTransform(smoothProgress, [0, 1], scaleRange)
  const translate = useTransform(smoothProgress, [0, 1], translateRange)

  return (
    <div
      className="h-[52rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-6 md:py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-6 md:-mt-12 mx-auto h-[26rem] md:h-[40rem] w-full border-2 md:border-4 border-[#6C6C6C] p-1.5 md:p-6 bg-[#222222] rounded-2xl md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-gray-100 dark:bg-zinc-900 md:p-4">
        {children}
      </div>
    </motion.div>
  )
}
