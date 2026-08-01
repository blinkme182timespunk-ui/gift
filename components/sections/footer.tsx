'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { config } from '@/lib/love-data'

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-16 pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-balance font-serif text-2xl italic leading-relaxed text-foreground sm:text-3xl">
            &ldquo;In all the world, there is no heart for me like yours. In all
            the world, there is no love for you like mine.&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="h-5 w-5 text-rose" fill="currentColor" />
            </motion.span>
            <span>for the love of my life</span>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-4 text-sm text-muted-foreground">
            Happy International Girlfriend Day, {config.herName}.
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
