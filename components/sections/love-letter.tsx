'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { config, loveLetter } from '@/lib/love-data'

function Typewriter({ text, start, delay = 0 }: { text: string; start: boolean; delay?: number }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf = 0
    let mounted = true
    const timeout = setTimeout(() => {
      const tick = () => {
        if (!mounted) return
        setShown((s) => {
          if (s >= text.length) return s
          raf = window.setTimeout(tick, 22) as unknown as number
          return s + 1
        })
      }
      tick()
    }, delay)

    return () => {
      mounted = false
      clearTimeout(timeout)
      clearTimeout(raf)
    }
  }, [start, text, delay])

  return (
    <p className="text-pretty text-lg leading-relaxed text-foreground/90 sm:text-xl">
      {text.slice(0, shown)}
      {shown < text.length && (
        <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
      )}
    </p>
  )
}

export function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section id="letter" className="relative px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div ref={ref} className="glass rounded-3xl p-8 shadow-xl sm:p-12">
            <div className="mb-8 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                <Heart className="h-7 w-7 text-primary" fill="currentColor" />
              </span>
            </div>

            <h2 className="mb-8 text-center font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              A Letter For You
            </h2>

            <div className="flex flex-col gap-6">
              {loveLetter.map((line, i) => (
                <Typewriter
                  key={i}
                  text={line}
                  start={inView}
                  delay={i * 2600}
                />
              ))}
            </div>

            <motion.div
              className="mt-10 text-right"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: loveLetter.length * 2.6, duration: 1 }}
            >
              <p className="font-serif text-2xl italic text-gradient">
                {config.yourName}
              </p>
              <motion.svg
                viewBox="0 0 200 40"
                className="ml-auto mt-1 h-10 w-40 text-primary"
                fill="none"
              >
                <motion.path
                  d="M4 28 C 20 6, 34 6, 40 22 C 44 34, 54 34, 60 18 C 68 -2, 84 4, 88 24 C 100 14, 120 12, 140 24 C 150 30, 170 28, 196 14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{
                    delay: loveLetter.length * 2.6 + 0.3,
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
