export default function EditorFab({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-void/90 px-4 py-3 text-sm text-white/80 shadow-lg backdrop-blur hover:border-neon-magenta hover:text-neon-magenta transition"
    >
      <span aria-hidden>⚙️</span>
      <span className="hidden sm:inline font-display tracking-wider uppercase text-xs">
        Editar Resultados / Subir Fotos
      </span>
      <span className="sm:hidden font-display tracking-wider uppercase text-xs">Editar</span>
    </button>
  )
}
