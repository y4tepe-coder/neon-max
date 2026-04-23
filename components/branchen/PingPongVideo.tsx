'use client'

import { useEffect, useRef } from 'react'

type Props = {
  src: string
  poster?: string
  className?: string
}

export default function PingPongVideo({ src, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let direction: 1 | -1 = 1
    let rafId = 0
    let lastTs = 0
    let started = false

    const tick = (ts: number) => {
      if (!video) return
      if (!lastTs) lastTs = ts
      const dt = (ts - lastTs) / 1000
      lastTs = ts

      const duration = video.duration
      if (!isFinite(duration) || duration <= 0) {
        rafId = requestAnimationFrame(tick)
        return
      }

      let t = video.currentTime + direction * dt
      if (t >= duration) {
        t = duration
        direction = -1
      } else if (t <= 0) {
        t = 0
        direction = 1
      }
      video.currentTime = t
      rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (started) return
      started = true
      video.pause()
      rafId = requestAnimationFrame(tick)
    }

    if (video.readyState >= 1) {
      start()
    } else {
      video.addEventListener('loadedmetadata', start, { once: true })
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
      } else if (started) {
        lastTs = 0
        rafId = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', handleVisibility)
      video.removeEventListener('loadedmetadata', start)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className={className}
    />
  )
}
