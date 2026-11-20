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
          <div className="h-full w-full bg-neon-purple/20" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/80 to-transparent p-3 pt-12">
          <span className="inline-flex items-center rounded border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-display tracking-wider text-emerald-300 uppercase">
            Mission Passed · 30/30
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-display text-xl uppercase tracking-wide text-white leading-tight">
          {team.name}
        </h3>
        {team.project && (
          <p className="text-sm text-white/75 leading-snug">{team.project}</p>
        )}
        {team.members?.length > 0 && (
          <p className="text-xs text-neon-cyan/70 pt-1">
            {team.members.map((m) => m.name).join(' · ')}
          </p>
        )}
      </div>
    </article>
  )
}
