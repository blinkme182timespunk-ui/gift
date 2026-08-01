'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2 } from 'lucide-react'
import { Reveal, SectionTitle } from '@/components/reveal'

const SONG = {
  title: 'Paper Rings',
  artist: 'Taylor Swift',
  src: '/audio/paper-rings.mp3',
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      void audio.play()
    }
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setCurrent(time)
  }

  return (
    <section id="music" className="relative px-6 py-28">
      <div className="mx-auto max-w-md">
        <SectionTitle eyebrow="Our Sound" title="A Melody For You" />

        <Reveal className="mt-12">
          <div className="glass flex flex-col items-center gap-6 rounded-3xl p-8 shadow-xl">
            <audio
              ref={audioRef}
              src={SONG.src}
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => setPlaying(false)}
            />

            <div className="text-center">
              <p className="font-serif text-xl font-semibold text-foreground">{SONG.title}</p>
              <p className="text-sm text-muted-foreground">{SONG.artist}</p>
            </div>

            <div className="relative">
              <motion.button
                type="button"
                onClick={toggle}
                whileTap={{ scale: 0.92 }}
                aria-label={playing ? 'Pause music' : 'Play music'}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {playing ? (
                  <Pause className="h-8 w-8" fill="currentColor" />
                ) : (
                  <Play className="ml-1 h-8 w-8" fill="currentColor" />
                )}
              </motion.button>
              <AnimatePresence>
                {playing && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Music className="h-4 w-4" />
              <span className="text-sm font-medium">
                {playing ? 'Now playing our song' : 'Tap play to set the mood'}
              </span>
            </div>

            {/* progress bar */}
            <div className="flex w-full items-center gap-3">
              <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                {formatTime(current)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={current}
                onChange={onSeek}
                aria-label="Seek"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
              <span className="w-10 text-xs tabular-nums text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>

            {/* animated equalizer */}
            <div className="flex h-8 items-end gap-1" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-full bg-primary/70"
                  animate={
                    playing
                      ? { height: ['20%', '100%', '40%', '80%', '20%'] }
                      : { height: '20%' }
                  }
                  transition={{
                    duration: 1 + (i % 3) * 0.3,
                    repeat: playing ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  style={{ height: '20%' }}
                />
              ))}
            </div>

            <div className="flex w-full items-center gap-3">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
