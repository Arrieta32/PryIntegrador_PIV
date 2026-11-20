import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    let frame

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => onDone?.(), 280)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void bg-sunset">
      <p className="font-display text-xs tracking-[0.45em] text-neon-cyan/80 uppercase mb-8 animate-shimmer">
        Rockstar Loading…
      </p>
      <h1 className="font-display text-6xl sm:text-8xl font-bold tracking-tight text-gradient-sunset mb-2">
        VI
      </h1>
      <p className="font-script text-3xl sm:text-4xl text-neon-magenta mb-12">Leonida</p>
      <div className="w-64 sm:w-80 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon-orange via-neon-magenta to-neon-cyan transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-display text-sm tracking-[0.3em] text-white/60">{progress}%</p>
      <p className="mt-10 font-display text-[10px] sm:text-xs tracking-[0.35em] text-white/40 uppercase">
        UniNorte · Programación IV · 2026
      </p>
    </div>
  )
}
