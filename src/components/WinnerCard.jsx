import { useRef, useState } from 'react'
import { downloadPoster } from '../lib/posterExport'

export default function WinnerCard({ team, place }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [busy, setBusy] = useState(false)

  const badge = place === 1 ? '🏆 #1 WINNER' : '🥈 #2 WINNER'
  const ring = place === 1 ? 'from-neon-orange via-neon-magenta to-neon-cyan' : 'from-neon-cyan via-neon-purple to-neon-magenta'

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 12 })
  }

  const onLeave = () => setTilt({ x: 0, y: 0 })

  const handleDownload = async () => {
    try {
      setBusy(true)
      await downloadPoster(cardRef.current, `${team.name.replace(/\s+/g, '-').toLowerCase()}-poster-gta.png`)
    } catch (err) {
      console.error(err)
      alert('No se pudo exportar el póster. Probá de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article
      className="perspective-[1200px] animate-rise"
      style={{ animationDelay: place === 1 ? '0.1s' : '0.25s' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={cardRef}
        className={`relative rounded-2xl p-[2px] bg-gradient-to-br ${ring} shadow-neon transition-transform duration-200 ease-out`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="rounded-2xl bg-void/95 overflow-hidden neon-border">
          <div className="relative aspect-[4/3] overflow-hidden">
            {team.photoDataUrl ? (
              <img
                src={team.photoDataUrl}
                alt={`Foto de ${team.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-neon-purple/40 to-neon-orange/30 flex items-center justify-center font-display tracking-widest text-white/50">
                SIN FOTO
              </div>
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="inline-flex w-fit items-center rounded-md bg-void/80 border border-neon-cyan/40 px-3 py-1 font-display text-xs tracking-widest text-neon-cyan backdrop-blur">
                {badge}
              </span>
              <span className="inline-flex w-fit items-center rounded-md bg-void/80 border border-yellow-400/40 px-3 py-1 text-sm text-yellow-300 shadow-gold">
                ⭐⭐⭐⭐⭐ {team.score}/30 PTS
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <p className="font-script text-xl text-neon-magenta leading-none mb-1">{team.name}</p>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-white leading-snug">
                {team.project}
              </h3>
            </div>

            <ul className="space-y-1.5">
              {team.members.map((m) => (
                <li key={`${team.id}-${m.name}`} className="flex justify-between gap-3 text-sm border-b border-white/5 pb-1">
                  <span className="text-white/90">{m.name}</span>
                  <span className="text-neon-cyan/80 font-display text-xs tracking-wider uppercase">{m.role}</span>
                </li>
              ))}
            </ul>

            {team.juryNote && (
              <p className="text-sm text-white/65 italic border-l-2 border-neon-orange pl-3">
                Jurado: {team.juryNote}
              </p>
            )}

            <button
              type="button"
              data-no-export="true"
              onClick={handleDownload}
              disabled={busy}
              className="w-full font-display uppercase tracking-widest text-sm px-4 py-3 rounded-md bg-gradient-to-r from-neon-purple to-neon-magenta text-white hover:brightness-110 disabled:opacity-60 transition"
            >
              {busy ? 'Generando…' : '📸 Descargar Póster GTA'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
