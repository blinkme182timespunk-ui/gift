'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Reveal, SectionTitle } from '@/components/reveal'
import { reasons } from '@/lib/love-data'

function FlipCard({
  index,
  title,
  detail,
}: {
  index: number
  title: string
  detail: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="preserve-3d relative h-52 w-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Reason ${index + 1}: ${title}. Tap to reveal.`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* front */}
        <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-card p-6 text-center shadow-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          </span>
          <h3 className="font-serif text-xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Tap to reveal
          </p>
        </div>

        {/* back */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center rounded-3xl bg-primary p-6 text-center shadow-lg shadow-primary/30">
          <p className="text-pretty text-lg leading-relaxed text-primary-foreground">
            {detail}
          </p>
        </div>
      </motion.div>
    </button>
  )
}

export function Reasons() {
  return (
    <section id="reasons" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Endlessly" title="Reasons I Love You" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.1}>
              <FlipCard index={i} title={r.title} detail={r.detail} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
