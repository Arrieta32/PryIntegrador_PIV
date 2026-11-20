import { useCallback, useState } from 'react'
import AudioToggle from './components/AudioToggle'
import Hero from './components/Hero'
import KingpinsSection from './components/KingpinsSection'
import LoadingScreen from './components/LoadingScreen'
import MissionWall from './components/MissionWall'
import { useTeamsStore } from './hooks/useTeamsStore'

export default function App() {
  const [booting, setBooting] = useState(true)
  const { winners, squads } = useTeamsStore()

  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <>
      {booting && <LoadingScreen onDone={finishBoot} />}

      <div className={booting ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Hero />
        <KingpinsSection winners={winners} />
        <MissionWall squads={squads} />

        <footer className="border-t border-white/5 section-pad pt-10 pb-20 text-center">
          <p className="font-script text-2xl text-neon-magenta mb-2">Mission Complete</p>
          <p className="font-display text-xs tracking-[0.35em] uppercase text-white/45 mb-6">
            UniNorte · Programación IV · Proyecto Integrador 2026
          </p>
          <p className="font-display text-[10px] tracking-[0.3em] uppercase text-neon-cyan/70 mb-2">
            Docentes
          </p>
          <p className="font-body text-sm sm:text-base text-white/80">
            David Aguero · Marcos Arrieta
          </p>
        </footer>
      </div>

      <AudioToggle />
    </>
  )
}
