import { useCallback, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEY, cloneSeed } from '../data/seedTeams'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed?.teams) && parsed.teams.length) {
        return parsed.teams
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return cloneSeed()
}

function normalizeRanks(teams, id, newRank) {
  return teams.map((t) => {
    if (t.id === id) return { ...t, rank: newRank }
    if (newRank != null && t.rank === newRank) return { ...t, rank: null }
    return t
  })
}

export function useTeamsStore() {
  const [teams, setTeams] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams, updatedAt: new Date().toISOString() }))
  }, [teams])

  const winners = useMemo(
    () =>
      [1, 2]
        .map((rank) => teams.find((t) => t.rank === rank))
        .filter(Boolean),
    [teams],
  )

  const squads = useMemo(() => teams.filter((t) => t.rank !== 1 && t.rank !== 2), [teams])

  const upsertTeam = useCallback((team) => {
    setTeams((prev) => {
      const normalized = {
        ...team,
        rank: team.rank === 1 || team.rank === 2 ? team.rank : null,
      }
      let next = prev.map((t) => {
        if (t.id === normalized.id) return normalized
        if (normalized.rank != null && t.rank === normalized.rank) {
          return { ...t, rank: null }
        }
        return t
      })
      if (!prev.some((t) => t.id === normalized.id)) {
        next = [...next, normalized]
      }
      return next
    })
  }, [])

  const addTeam = useCallback((partial = {}) => {
    const id = partial.id || `team-${Date.now()}`
    const team = {
      rank: null,
      name: 'Nuevo Squad',
      project: 'Proyecto sin título',
      members: [{ name: 'Integrante', role: 'Dev' }],
      juryNote: '',
      score: 30,
      photoDataUrl: '',
      originalPhotoDataUrl: '',
      filterIntensity: 0.75,
      ...partial,
      id,
    }
    setTeams((prev) => [...prev, team])
    return team.id
  }, [])

  const removeTeam = useCallback((id) => {
    setTeams((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const setRank = useCallback((id, rank) => {
    setTeams((prev) => normalizeRanks(prev, id, rank))
  }, [])

  const resetToSeed = useCallback(() => {
    const seed = cloneSeed()
    setTeams(seed)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams: seed, updatedAt: new Date().toISOString() }))
  }, [])

  const exportJson = useCallback(() => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      teams,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hof-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [teams])

  const importJson = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result)
          if (!Array.isArray(data.teams)) throw new Error('JSON inválido: falta teams[]')
          setTeams(data.teams)
          resolve(data.teams.length)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error('No se pudo leer el JSON'))
      reader.readAsText(file)
    })
  }, [])

  return {
    teams,
    winners,
    squads,
    upsertTeam,
    addTeam,
    removeTeam,
    setRank,
    resetToSeed,
    exportJson,
    importJson,
  }
}
