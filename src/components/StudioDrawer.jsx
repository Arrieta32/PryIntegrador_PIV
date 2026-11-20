import { useMemo, useState } from 'react'
import { processTeamPhoto } from '../lib/gtaFilter'

const emptyForm = {
  id: '',
  name: '',
  project: '',
  juryNote: '',
  score: 30,
  rank: null,
  filterIntensity: 0.75,
  photoDataUrl: '',
  originalPhotoDataUrl: '',
  members: [{ name: '', role: '' }],
}

export default function StudioDrawer({
  open,
  onClose,
  teams,
  upsertTeam,
  addTeam,
  removeTeam,
  resetToSeed,
  exportJson,
  importJson,
}) {
  const [selectedId, setSelectedId] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [formSyncedId, setFormSyncedId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')

  const activeId = selectedId || teams[0]?.id || ''
  const selected = useMemo(() => teams.find((t) => t.id === activeId), [teams, activeId])

  if (open && selected && formSyncedId !== selected.id) {
    setFormSyncedId(selected.id)
    setForm({
      ...selected,
      originalPhotoDataUrl: selected.originalPhotoDataUrl || '',
      members: selected.members?.length ? selected.members.map((m) => ({ ...m })) : [{ name: '', role: '' }],
    })
    setStatus('')
  }

  if (!open) return null

  const updateMember = (index, key, value) => {
    setForm((prev) => {
      const members = [...prev.members]
      members[index] = { ...members[index], [key]: value }
      return { ...prev, members }
    })
  }

  const addMemberRow = () => {
    setForm((prev) => ({ ...prev, members: [...prev.members, { name: '', role: '' }] }))
  }

  const removeMemberRow = (index) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }))
  }

  const reprocessPhoto = async (source, intensity, alsoSetOriginal = false) => {
    setBusy(true)
    setStatus('Aplicando filtro GTA VI…')
    try {
      const url = await processTeamPhoto(source, intensity)
      setForm((prev) => ({
        ...prev,
        photoDataUrl: url,
        filterIntensity: intensity,
        ...(alsoSetOriginal
          ? { originalPhotoDataUrl: typeof source === 'string' ? source : prev.originalPhotoDataUrl }
          : {}),
      }))
      setStatus('Filtro aplicado. Guardá para persistir.')
    } catch (err) {
      console.error(err)
      setStatus(err.message || 'Error al procesar la imagen')
    } finally {
      setBusy(false)
    }
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const dataUrl = reader.result
      setForm((prev) => ({ ...prev, originalPhotoDataUrl: dataUrl }))
      await reprocessPhoto(dataUrl, form.filterIntensity ?? 0.75, true)
    }
    reader.readAsDataURL(file)
  }

  const onIntensity = async (value) => {
    const intensity = Number(value)
    setForm((prev) => ({ ...prev, filterIntensity: intensity }))
    const source = form.originalPhotoDataUrl || form.photoDataUrl
    if (!source) return
    await reprocessPhoto(source, intensity)
  }

  const save = () => {
    if (!form.id) return
    const cleaned = {
      ...form,
      rank: form.rank === '' || form.rank == null ? null : Number(form.rank),
      score: Number(form.score) || 30,
      filterIntensity: Number(form.filterIntensity) || 0.75,
      members: form.members.filter((m) => m.name.trim()),
    }
    upsertTeam(cleaned)
    setStatus('Guardado en localStorage (borrador). Exportá JSON para producción.')
  }

  const handleAdd = () => {
    const id = addTeam()
    setSelectedId(id)
    setFormSyncedId(null)
    setStatus('Nuevo squad creado.')
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const n = await importJson(file)
      setStatus(`Importados ${n} equipos.`)
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-label="Cerrar" />
      <aside className="relative z-10 h-full w-full max-w-lg overflow-y-auto border-l border-neon-magenta/30 bg-void shadow-neon animate-rise">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-void/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="font-script text-xl text-neon-magenta">Studio Docente</p>
            <p className="text-xs text-white/50">GTA VI Photo Transformer · Panel de resultados</p>
          </div>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white text-xl px-2">
            ×
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-md border border-neon-cyan/40 px-3 py-1.5 text-xs font-display tracking-wider uppercase text-neon-cyan hover:bg-neon-cyan/10"
            >
              + Agregar squad
            </button>
            <button
              type="button"
              onClick={exportJson}
              className="rounded-md border border-neon-orange/40 px-3 py-1.5 text-xs font-display tracking-wider uppercase text-neon-orange hover:bg-neon-orange/10"
            >
              Exportar JSON
            </button>
            <label className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-display tracking-wider uppercase text-white/70 hover:bg-white/5 cursor-pointer">
              Importar JSON
              <input type="file" accept="application/json,.json" className="hidden" onChange={handleImport} />
            </label>
            <button
              type="button"
              onClick={() => {
                if (confirm('¿Resetear al seed de ejemplo?')) resetToSeed()
              }}
              className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-display tracking-wider uppercase text-white/50 hover:text-white/80"
            >
              Reset seed
            </button>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-display tracking-widest uppercase text-white/50">Equipo</span>
            <select
              value={activeId}
              onChange={(e) => {
                setSelectedId(e.target.value)
                setFormSyncedId(null)
              }}
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm"
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.rank === 1 ? '🏆 #1 · ' : t.rank === 2 ? '🥈 #2 · ' : '✓ 30/30 · '}
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          {form.id && (
            <>
              <Field label="Nombre del grupo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Proyecto" value={form.project} onChange={(v) => setForm({ ...form, project: v })} />
              <Field label="Destacado del jurado" value={form.juryNote} onChange={(v) => setForm({ ...form, juryNote: v })} />

              <label className="block space-y-1.5">
                <span className="text-xs font-display tracking-widest uppercase text-white/50">Slot ganador</span>
                <select
                  value={form.rank ?? ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rank: e.target.value === '' ? null : Number(e.target.value),
                    })
                  }
                  className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm"
                >
                  <option value="">Mission Passed (muro 30/30)</option>
                  <option value="1">🏆 #1 WINNER</option>
                  <option value="2">🥈 #2 WINNER</option>
                </select>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display tracking-widest uppercase text-white/50">Integrantes</span>
                  <button type="button" onClick={addMemberRow} className="text-xs text-neon-cyan">
                    + integrante
                  </button>
                </div>
                {form.members.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={m.name}
                      onChange={(e) => updateMember(i, 'name', e.target.value)}
                      placeholder="Nombre"
                      className="flex-1 rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                    />
                    <input
                      value={m.role}
                      onChange={(e) => updateMember(i, 'role', e.target.value)}
                      placeholder="Rol"
                      className="w-28 rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                    />
                    <button type="button" onClick={() => removeMemberRow(i)} className="text-white/40 px-1">
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-display tracking-widest uppercase text-neon-magenta">Foto · Filtro GTA VI</p>
                <input type="file" accept="image/*" onChange={onFile} className="block w-full text-sm text-white/70" />
                <label className="block space-y-1">
                  <span className="text-xs text-white/50">Intensidad {Math.round((form.filterIntensity ?? 0.75) * 100)}%</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={form.filterIntensity ?? 0.75}
                    onChange={(e) => onIntensity(e.target.value)}
                    className="w-full accent-neon-magenta"
                    disabled={busy || (!form.originalPhotoDataUrl && !form.photoDataUrl)}
                  />
                </label>
                {form.photoDataUrl && (
                  <img src={form.photoDataUrl} alt="Preview filtrado" className="w-full rounded-lg border border-neon-cyan/30" />
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={save}
                  disabled={busy}
                  className="flex-1 rounded-md bg-gradient-to-r from-neon-magenta to-neon-orange px-4 py-2.5 font-display text-sm uppercase tracking-widest text-void font-semibold disabled:opacity-50"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`¿Eliminar ${form.name}?`)) {
                      removeTeam(form.id)
                      setSelectedId(teams.find((t) => t.id !== form.id)?.id || '')
                      setFormSyncedId(null)
                    }
                  }}
                  className="rounded-md border border-red-400/40 px-4 py-2.5 text-sm text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}

          {status && <p className="text-sm text-neon-cyan/90 border border-neon-cyan/20 rounded-md px-3 py-2 bg-neon-cyan/5">{status}</p>}

          <p className="text-xs text-white/40 leading-relaxed">
            El borrador vive en <code className="text-white/60">localStorage</code> de este navegador. Para que los
            estudiantes lo vean en GitHub Pages: Exportar JSON → reemplazar el seed en el repo → commit + push.
          </p>
        </div>
      </aside>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-display tracking-widest uppercase text-white/50">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm"
      />
    </label>
  )
}
