/**
 * GTA VI-style browser-only image filter via Canvas pixel pipeline.
 * Soft posterize + saturation/contrast + purple/orange duotone + overlays.
 */

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, v))
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function hexToRgb(hex) {
  const n = hex.replace('#', '')
  const v = parseInt(n.length === 3 ? n.split('').map((c) => c + c).join('') : n, 16)
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }
}

const SHADOW = hexToRgb('#9d4edd')
const MID = hexToRgb('#ff2a85')
const HIGHLIGHT = hexToRgb('#ff7b00')
const CYAN = hexToRgb('#00f0ff')

/**
 * @param {HTMLImageElement|ImageBitmap} image
 * @param {{ intensity?: number, width?: number, banner?: string }} options
 * @returns {string} PNG data URL
 */
export function applyGtaFilter(image, options = {}) {
  const intensity = clamp(options.intensity ?? 0.75, 0, 1)
  const maxW = options.width ?? 960
  const banner = options.banner ?? 'MISSION PASSED 30/30'

  const scale = Math.min(1, maxW / image.width)
  const w = Math.max(1, Math.round(image.width * scale))
  const h = Math.max(1, Math.round(image.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(image, 0, 0, w, h)

  const imgData = ctx.getImageData(0, 0, w, h)
  const d = imgData.data
  const contrast = 1.25
  const sat = 1.45
  const levels = 6

  for (let i = 0; i < d.length; i += 4) {
    let r = d[i]
    let g = d[i + 1]
    let b = d[i + 2]

    // Contrast
    r = clamp(((r / 255 - 0.5) * contrast + 0.5) * 255)
    g = clamp(((g / 255 - 0.5) * contrast + 0.5) * 255)
    b = clamp(((b / 255 - 0.5) * contrast + 0.5) * 255)

    // Saturation
    const gray = 0.299 * r + 0.587 * g + 0.114 * b
    r = clamp(gray + (r - gray) * sat)
    g = clamp(gray + (g - gray) * sat)
    b = clamp(gray + (b - gray) * sat)

    // Soft posterize
    const step = 255 / (levels - 1)
    r = Math.round(r / step) * step
    g = Math.round(g / step) * step
    b = Math.round(b / step) * step

    // Duotone by luminance
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    let tr
    let tg
    let tb
    if (lum < 0.45) {
      const t = lum / 0.45
      tr = lerp(SHADOW.r, MID.r, t)
      tg = lerp(SHADOW.g, MID.g, t)
      tb = lerp(SHADOW.b, MID.b, t)
    } else {
      const t = (lum - 0.45) / 0.55
      tr = lerp(MID.r, HIGHLIGHT.r, t)
      tg = lerp(MID.g, HIGHLIGHT.g, t)
      tb = lerp(MID.b, HIGHLIGHT.b, t)
      // Cool rim in highlights
      tr = lerp(tr, CYAN.r, t * 0.15)
      tg = lerp(tg, CYAN.g, t * 0.15)
      tb = lerp(tb, CYAN.b, t * 0.2)
    }

    // Blend original → stylized by intensity
    const or = d[i]
    const og = d[i + 1]
    const ob = d[i + 2]
    d[i] = clamp(lerp(or, tr, intensity))
    d[i + 1] = clamp(lerp(og, tg, intensity))
    d[i + 2] = clamp(lerp(ob, tb, intensity))
  }

  ctx.putImageData(imgData, 0, 0)

  // Vignette + sunset wash
  const grad = ctx.createRadialGradient(w * 0.5, h * 0.35, w * 0.1, w * 0.5, h * 0.5, w * 0.85)
  grad.addColorStop(0, 'rgba(255,123,0,0)')
  grad.addColorStop(0.55, 'rgba(255,42,133,0.08)')
  grad.addColorStop(1, 'rgba(11,6,22,0.55)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Frame
  ctx.strokeStyle = 'rgba(0,240,255,0.65)'
  ctx.lineWidth = Math.max(4, Math.round(w * 0.008))
  ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, w - ctx.lineWidth, h - ctx.lineWidth)

  // "VI" logo
  const logoSize = Math.round(w * 0.12)
  ctx.font = `900 ${logoSize}px Oswald, Anton, Impact, sans-serif`
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.fillStyle = 'rgba(255,42,133,0.9)'
  ctx.shadowColor = 'rgba(0,240,255,0.7)'
  ctx.shadowBlur = 12
  ctx.fillText('VI', w - w * 0.04, h * 0.04)
  ctx.shadowBlur = 0

  // Bottom banner
  const barH = Math.round(h * 0.11)
  const barY = h - barH
  const barGrad = ctx.createLinearGradient(0, barY, w, h)
  barGrad.addColorStop(0, 'rgba(157,78,221,0.92)')
  barGrad.addColorStop(0.5, 'rgba(255,42,133,0.95)')
  barGrad.addColorStop(1, 'rgba(255,123,0,0.92)')
  ctx.fillStyle = barGrad
  ctx.fillRect(0, barY, w, barH)

  ctx.fillStyle = '#0b0616'
  ctx.font = `700 ${Math.round(barH * 0.42)}px Oswald, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(banner, w / 2, barY + barH / 2)

  return canvas.toDataURL('image/png')
}

/**
 * Load a File or data URL into an HTMLImageElement.
 * @param {File|string} source
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo cargar la imagen'))
    if (typeof source === 'string') {
      img.src = source
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        img.src = reader.result
      }
      reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
      reader.readAsDataURL(source)
    }
  })
}

/**
 * @param {File|string} source
 * @param {number} intensity
 * @returns {Promise<string>}
 */
export async function processTeamPhoto(source, intensity = 0.75) {
  const img = await loadImage(source)
  return applyGtaFilter(img, { intensity })
}
