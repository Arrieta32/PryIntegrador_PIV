export default function SquadCard({ team, index }) {
  return (
    <article
      className="group relative rounded-xl neon-border bg-gradient-to-b from-white/[0.06] to-void/80 overflow-hidden animate-rise hover:-translate-y-1 transition-transform duration-300"
      style={{ animationDelay: `${0.05 * (index % 6)}s` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {team.photoDataUrl ? (
          <img
            src={team.photoDataUrl}
            alt={team.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neon-purple/20 flex items-center justify-center text-white/40 font-display tracking-widest">
            CREW
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/70 to-transparent p-3 pt-10">
          <span className="inline-flex items-center gap-1 rounded border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] sm:text-xs font-display tracking-wider text-emerald-300 uppercase">
            MISSION PASSED: +30 RESPECT
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg uppercase tracking-wide text-white leading-tight">{team.name}</h3>
          <span className="shrink-0 text-yellow-300 text-xs font-display tracking-wider">{team.score}/30</span>
        </div>
        <p className="text-sm text-white/70 leading-snug">{team.project}</p>
        <p className="text-xs text-neon-cyan/70">
          {team.members.map((m) => m.name).join(' · ')}
        </p>
      </div>

      <div
        className="pointer-events-none absolute -right-6 -top-2 rotate-12 border-2 border-yellow-400/70 text-yellow-300/90 font-display text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-void/60 opacity-80"
        aria-hidden
      >
        Cleared
      </div>
    </article>
  )
}
