import { toPng } from 'html-to-image'

/**
 * Export a DOM card node as a shareable PNG.
 * @param {HTMLElement} node
 * @param {string} filename
 */
export async function downloadPoster(node, filename = 'gta-poster.png') {
  if (!node) throw new Error('Nodo de póster no encontrado')

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#0b0616',
    filter: (el) => {
      if (el?.dataset?.noExport === 'true') return false
      return true
    },
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
