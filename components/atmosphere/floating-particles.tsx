'use client'

import { useEffect, useMemo, useState } from 'react'
import { Heart, Sparkles } from 'lucide-react'

type Particle = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
  kind: 'heart' | 'sparkle' | 'dot'
}

function useIsClient() {
  const [client, setClient] = useState(false)
  useEffect(() => setClient(true), [])
  return client
}

export function FloatingParticles({ count = 22 }: { count?: number }) {
  const isClient = useIsClient()

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const kinds: Particle['kind'][] = ['heart', 'sparkle', 'dot']
      return {
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        duration: 12 + Math.random() * 16,
        delay: Math.random() * 16,
        opacity: 0.25 + Math.random() * 0.4,
        kind: kinds[i % 3],
      }
    })
  }, [count])

  if (!isClient) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-40px] will-animate"
          style={{
            left: `${p.left}%`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            ['--float-opacity' as string]: p.opacity,
          }}
        >
          {p.kind === 'heart' ? (
            <Heart
              className="text-rose"
              style={{ width: p.size, height: p.size }}
              fill="currentColor"
            />
          ) : p.kind === 'sparkle' ? (
            <Sparkles
              className="text-gold"
              style={{ width: p.size, height: p.size }}
            />
          ) : (
            <span
              className="block rounded-full bg-lavender"
              style={{ width: p.size / 2.4, height: p.size / 2.4 }}
            />
          )}
        </span>
      ))}
    </div>
  )
}
