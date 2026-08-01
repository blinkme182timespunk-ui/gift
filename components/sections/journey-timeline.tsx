'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Reveal, SectionTitle } from '@/components/reveal'
import { timeline } from '@/lib/love-data'

export function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Our Story" title="The Journey of Us" />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-0">
          {/* center line (desktop) / left line (mobile) */}
          <div className="absolute bottom-0 left-3 top-0 w-0.5 bg-border sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            className="absolute left-3 top-0 w-0.5 origin-top bg-primary sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: lineScale, height: '100%' }}
          />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <Reveal key={item.title} y={50}>
                  <div
                    className={`relative flex items-center sm:justify-between ${
                      isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* node */}
                    <span className="absolute left-3 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-md shadow-primary/40 sm:left-1/2">
                      <Heart className="h-3 w-3 text-primary-foreground" fill="currentColor" />
                    </span>

                    <div className="ml-8 w-full sm:ml-0 sm:w-[45%]">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="glass rounded-2xl p-6 shadow-md"
                      >
                        <p className="text-sm font-medium uppercase tracking-widest text-primary">
                          {item.date}
                        </p>
                        <h3 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    <div className="hidden sm:block sm:w-[45%]" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
