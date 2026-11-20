import WinnerCard from './WinnerCard'

export default function KingpinsSection({ winners }) {
  return (
    <section id="kingpins" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-rise">
          <p className="font-script text-2xl sm:text-3xl text-neon-cyan mb-2">The Kingpins</p>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Top 2 Winners
          </h2>
          <p className="mt-3 text-white/60 max-w-lg mx-auto">
            Elegidos por el jurado técnico y referentes de talento IT. Misión perfecta, corona de Leonida.
          </p>
        </div>

        {winners.length === 0 ? (
          <p className="text-center text-white/50 font-display tracking-widest uppercase">
            Aún no hay kingpins asignados — usá el panel docente.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {winners.map((team) => (
              <WinnerCard key={team.id} team={team} place={team.rank} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
