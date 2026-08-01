'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.4 })

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop).
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 160)
      y.set(e.clientY - 160)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-80 w-80 rounded-full will-animate"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(circle, color-mix(in oklch, var(--primary) 30%, transparent) 0%, transparent 65%)',
        filter: 'blur(20px)',
      }}
    />
  )
}
