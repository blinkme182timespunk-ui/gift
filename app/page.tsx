import { LoadingScreen } from '@/components/loading-screen'
import { ThemeToggle } from '@/components/theme-toggle'
import { CursorGlow } from '@/components/atmosphere/cursor-glow'
import { FloatingParticles } from '@/components/atmosphere/floating-particles'
import { Hero } from '@/components/sections/hero'
import { LoveLetter } from '@/components/sections/love-letter'
import { MemoriesGallery } from '@/components/sections/memories-gallery'
import { JourneyTimeline } from '@/components/sections/journey-timeline'
import { Reasons } from '@/components/sections/reasons'
import { MusicPlayer } from '@/components/sections/music-player'
import { Countdown } from '@/components/sections/countdown'
import { Surprise } from '@/components/sections/surprise'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <ThemeToggle />
      <CursorGlow />
      <FloatingParticles />

      <main className="relative z-10">
        <Hero />
        <LoveLetter />
        <MemoriesGallery />
        <JourneyTimeline />
        <Reasons />
        <MusicPlayer />
        <Countdown />
        <Surprise />
        <Footer />
      </main>
    </>
  )
}
