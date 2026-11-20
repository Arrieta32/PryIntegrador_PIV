import SquadCard from './SquadCard'

export default function MissionWall({ squads }) {
  return (
    <section id="mission-wall" className="section-pad relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-rise">
          <p className="font-script text-2xl sm:text-3xl text-neon-orange mb-2">Respect +30</p>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight">
            Mission Passed — 30/30
          </h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Todos los equipos lograron la calificación máxima. Muro de honor de Programación IV.
          </p>
        </div>

        {squads.length === 0 ? (
          <p className="text-center text-white/50">Todos los equipos están en el Top 2… o aún no hay squads.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {squads.map((team, i) => (
              <SquadCard key={team.id} team={team} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
