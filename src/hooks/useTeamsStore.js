import { useMemo } from 'react'
import { STORAGE_KEY, seedTeams } from '../data/seedTeams'

/** Clear legacy draft keys — photos exceed localStorage quota (~5MB). */
function clearLegacyDrafts() {
  try {
    ;[
      STORAGE_KEY,
      'uninorte-piv-hof-2026',
      'uninorte-piv-hof-2026-v2',
      'uninorte-piv-hof-2026-v3',
    ].forEach((key) => localStorage.removeItem(key))
  } catch {
    /* private mode / blocked storage */
  }
}

clearLegacyDrafts()

/**
 * Read-only store from committed seed (hof-config.json).
 * No localStorage — base64 photos would exceed browser quota.
 */
export function useTeamsStore() {
  const teams = seedTeams

  const winners = useMemo(
    () =>
      [1, 2]
        .map((rank) => teams.find((t) => t.rank === rank))
        .filter(Boolean),
    [teams],
  )

  const squads = useMemo(() => teams.filter((t) => t.rank !== 1 && t.rank !== 2), [teams])

  return { teams, winners, squads }
}
