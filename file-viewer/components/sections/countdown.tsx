'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SectionTitle } from '@/components/reveal'
import { config } from '@/lib/love-data'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="glass relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl shadow-md min-[380px]:h-20 min-[380px]:w-20 sm:h-24 sm:w-24">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl font-semibold text-foreground min-[380px]:text-3xl sm:text-4xl"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground min-[380px]:text-xs">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const [target] = useState(() => {
    let t = new Date(config.anniversary).getTime()
    // if the date has passed, roll to the same day next year
    const now = Date.now()
    while (t < now) {
      const d = new Date(t)
      d.setFullYear(d.getFullYear() + 1)
      t = d.getTime()
    }
    return t
  })
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section id="countdown" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <SectionTitle
          eyebrow="Counting Down"
          title="Until Our Next Celebration"
        />

        <Reveal className="mt-14">
          <div className="flex items-start justify-center gap-2 min-[380px]:gap-3 sm:gap-6">
            {time ? (
              <>
                <Unit value={time.days} label="Days" />
                <Unit value={time.hours} label="Hours" />
                <Unit value={time.minutes} label="Minutes" />
                <Unit value={time.seconds} label="Seconds" />
              </>
            ) : (
              <div className="h-24" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-pretty leading-relaxed text-muted-foreground">
            Every second brings me closer to holding you again.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
