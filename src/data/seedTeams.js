/** Official results seed — edit via Studio, then replace src/data/hof-config.json. */
import hofConfig from './hof-config.json'

export const STORAGE_KEY = 'uninorte-piv-hof-2026-v2'

export const seedTeams = hofConfig.teams

export function cloneSeed() {
  return structuredClone(seedTeams)
}
