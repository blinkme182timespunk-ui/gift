'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gift, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Reveal, SectionTitle } from '@/components/reveal'
import { surpriseMessage } from '@/lib/love-data'

const REQUIRED = 5

export function Surprise() {
  const [count, setCount] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const celebrate = useCallback(() => {
    const colors = ['#ff9ec4', '#f6c9dd', '#c9b6f0', '#f2d59b', '#ffffff']
    // confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors,
      scalar: 1.1,
    })
    // heart-ish fireworks
    const end = Date.now() + 1200
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  function handleClick() {
    if (revealed) {
      celebrate()
      return
    }
    const next = count + 1
    setCount(next)
    // little pop each tap
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.65 },
      colors: ['#ff9ec4', '#c9b6f0', '#f2d59b'],
      scalar: 0.8,
    })
    if (next >= REQUIRED) {
      setRevealed(true)
      setTimeout(celebrate, 150)
    }
  }

  const remaining = Math.max(0, REQUIRED - count)

  return (
    <section id="surprise" className="relative px-6 py-28">
      <div className="mx-auto max-w-xl text-center">
        <SectionTitle eyebrow="Shhh" title="A Little Surprise" />

        <Reveal className="mt-6">
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {revealed
              ? 'You unlocked it. Tap again for more confetti!'
              : `Tap the heart ${REQUIRED} times to reveal a secret message.`}
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <motion.button
            type="button"
            onClick={handleClick}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            aria-label={
              revealed ? 'Celebrate again' : `Tap the heart. ${remaining} taps left.`
            }
            className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {revealed ? (
                <Gift className="h-14 w-14 text-primary" />
              ) : (
                <Heart className="h-14 w-14 text-primary" fill="currentColor" />
              )}
            </motion.span>
          </motion.button>
        </Reveal>

        {!revealed && count > 0 && (
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-primary">
            {remaining} more {remaining === 1 ? 'tap' : 'taps'}
          </p>
        )}

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-10 rounded-3xl p-8 shadow-xl"
            >
              <p className="text-pretty font-serif text-xl italic leading-relaxed text-foreground">
                {surpriseMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
