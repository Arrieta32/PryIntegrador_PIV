import PalmParallax from './PalmParallax'

export default function Hero() {
  return (
    <header className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      <PalmParallax />

      <div className="relative z-10 section-pad pt-24 pb-32 text-center animate-rise">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-void/50 px-4 py-2 backdrop-blur-md mb-8 shadow-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
          <p className="font-display text-[10px] sm:text-xs tracking-[0.35em] text-neon-cyan uppercase">
            UniNorte · Programación IV · 2026
          </p>
        </div>

        <p className="font-script text-3xl sm:text-5xl text-neon-magenta drop-shadow-[0_0_20px_rgba(255,42,133,0.5)] mb-3">
          Leonida / Vice City
        </p>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95] mb-6">
          <span className="block text-white">Hall of Fame</span>
          <span className="block text-gradient-sunset">Proyecto Integrador</span>
        </h1>

        <p className="mx-auto max-w-xl text-base sm:text-lg text-white/70 font-body leading-relaxed">
          Todos los squads cerraron la misión con <strong className="text-neon-cyan">30/30</strong>.
          El jurado coronó a dos kingpins absolutos. Bienvenidos al atardecer de Leonida.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#kingpins"
            className="font-display uppercase tracking-widest text-sm px-6 py-3 rounded-md bg-gradient-to-r from-neon-magenta to-neon-orange text-void font-semibold shadow-neon hover:scale-[1.03] transition-transform"
          >
            Ver Kingpins
          </a>
          <a
            href="#mission-wall"
            className="font-display uppercase tracking-widest text-sm px-6 py-3 rounded-md border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
          >
            Muro 30/30
          </a>
        </div>
      </div>
    </header>
  )
}
