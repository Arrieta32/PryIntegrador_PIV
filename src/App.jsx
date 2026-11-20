import { useCallback, useState } from 'react'
import AudioToggle from './components/AudioToggle'
import EditorFab from './components/EditorFab'
import Hero from './components/Hero'
import KingpinsSection from './components/KingpinsSection'
import LoadingScreen from './components/LoadingScreen'
import MissionWall from './components/MissionWall'
import StudioDrawer from './components/StudioDrawer'
import { useTeamsStore } from './hooks/useTeamsStore'

export default function App() {
  const [booting, setBooting] = useState(true)
  const [studioOpen, setStudioOpen] = useState(false)
  const store = useTeamsStore()

  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <>
      {booting && <LoadingScreen onDone={finishBoot} />}

      <div className={booting ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Hero />
        <KingpinsSection winners={store.winners} />
        <MissionWall squads={store.squads} />

        <footer className="border-t border-white/5 section-pad pt-10 pb-24 text-center">
          <p className="font-script text-2xl text-neon-magenta mb-2">Mission Complete</p>
          <p className="font-display text-xs tracking-[0.35em] uppercase text-white/45">
            UniNorte · Programación IV · Proyecto Integrador 2026
          </p>
        </footer>
      </div>

      <AudioToggle />
      <EditorFab onClick={() => setStudioOpen(true)} />
      <StudioDrawer open={studioOpen} onClose={() => setStudioOpen(false)} {...store} />
    </>
  )
}
