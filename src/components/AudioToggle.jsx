import { useState } from 'react'
import {
  isSynthPlaying,
  playMissionPassed,
  startSynthwaveLoop,
  stopSynthwaveLoop,
} from '../lib/synthAudio'

export default function AudioToggle() {
  const [on, setOn] = useState(false)

  const toggle = async () => {
    if (isSynthPlaying() || on) {
      stopSynthwaveLoop()
      setOn(false)
      return
    }
    await playMissionPassed()
    await startSynthwaveLoop()
    setOn(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={on ? 'Silenciar synthwave' : 'Reproducir Vice City synth'}
      className={`fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full border flex items-center justify-center transition shadow-lg ${
        on
          ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan animate-pulseGlow'
          : 'border-white/20 bg-void/80 text-white/70 hover:border-neon-magenta hover:text-neon-magenta'
      }`}
      aria-pressed={on}
    >
      <span className="text-lg" aria-hidden>
        {on ? '🔊' : '🎵'}
      </span>
      <span className="sr-only">{on ? 'Apagar audio' : 'Encender audio'}</span>
    </button>
  )
}
