/** Procedural Vice City / Mission Passed sting via Web Audio API (no mp3). */

let ctx = null
let looping = false
let loopNodes = []

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return ctx
}

function playTone(audioCtx, freq, start, duration, type = 'sawtooth', gain = 0.08) {
  const osc = audioCtx.createOscillator()
  const g = audioCtx.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.04)
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(g)
  g.connect(audioCtx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.05)
  return { osc, g }
}

/** One-shot Mission Passed chord sting */
export async function playMissionPassed() {
  const audioCtx = getCtx()
  if (audioCtx.state === 'suspended') await audioCtx.resume()
  const t = audioCtx.currentTime
  const chord = [110, 164.81, 220, 277.18, 329.63]
  chord.forEach((f, i) => {
    playTone(audioCtx, f, t + i * 0.05, 1.2, i % 2 ? 'square' : 'sawtooth', 0.06)
  })
  playTone(audioCtx, 440, t + 0.35, 0.9, 'triangle', 0.05)
  playTone(audioCtx, 554.37, t + 0.55, 0.7, 'triangle', 0.04)
}

/** Soft looping synthwave pad */
export async function startSynthwaveLoop() {
  const audioCtx = getCtx()
  if (audioCtx.state === 'suspended') await audioCtx.resume()
  if (looping) return
  looping = true

  const master = audioCtx.createGain()
  master.gain.value = 0.045
  master.connect(audioCtx.destination)

  const freqs = [65.41, 98, 130.81, 196]
  loopNodes = freqs.map((f, i) => {
    const osc = audioCtx.createOscillator()
    const g = audioCtx.createGain()
    const lfo = audioCtx.createOscillator()
    const lfoGain = audioCtx.createGain()
    osc.type = i < 2 ? 'sawtooth' : 'triangle'
    osc.frequency.value = f
    lfo.frequency.value = 0.15 + i * 0.05
    lfoGain.gain.value = 0.012
    lfo.connect(lfoGain)
    lfoGain.connect(g.gain)
    g.gain.value = 0.35 / freqs.length
    osc.connect(g)
    g.connect(master)
    osc.start()
    lfo.start()
    return { osc, g, lfo }
  })
}

export function stopSynthwaveLoop() {
  looping = false
  loopNodes.forEach(({ osc, lfo }) => {
    try {
      osc.stop()
      lfo.stop()
    } catch {
      /* already stopped */
    }
  })
  loopNodes = []
}

export function isSynthPlaying() {
  return looping
}
