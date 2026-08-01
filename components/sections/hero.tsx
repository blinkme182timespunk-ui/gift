'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { MagneticButton } from '@/components/magnetic-button'
import { config } from '@/lib/love-data'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  function scrollToLetter() {
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 will-animate"
      >
        <Image
          src="/images/hero-romantic.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center will-animate"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-foreground"
        >
          <Heart className="h-4 w-4 text-rose" fill="currentColor" />
          International Girlfriend Day
        </motion.div>

        <motion.h1
          className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
        >
          Happy{' '}
          <span className="text-gradient">Girlfriend Day</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease }}
        >
          To {config.herName} — my favorite person, my safest place, and every
          beautiful reason my heart beats a little faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease }}
          className="mt-10"
        >
          <MagneticButton onClick={scrollToLetter} ariaLabel="Read your love letter">
            <Heart className="h-4 w-4" fill="currentColor" />
            Read My Letter
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={scrollToLetter}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.span
          className="block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-7 w-7" />
        </motion.span>
      </motion.button>
    </section>
  )
}
