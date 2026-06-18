/**
 * utils/pdfExport.js — Helper para exportar a PDF.
 *
 * Usa html2pdf.js (lazy import) para capturar el contenedor de
 * impresión y guardarlo como un PDF multipágina.
 */
import PrintLayout from '../components/PrintLayout.jsx'
import { createRoot } from 'react-dom/client'

/**
 * Genera un PDF con toda la wiki renderizada.
 *
 * Estrategia:
 *  1) Creamos un nodo DOM oculto y montamos <PrintLayout /> dentro.
 *  2) Forzamos el tema claro en el documento durante la exportación.
 *  3) Esperamos un par de frames para que las fuentes/CSS apliquen.
 *  4) html2pdf captura ese nodo y guarda el PDF.
 *  5) Limpiamos el DOM y devolvemos el tema a su estado original.
 */
export async function exportWikiToPDF({ filename = 'sql-injection-wiki.pdf' } = {}) {
  // 1) contenedor oculto
  const host = document.createElement('div')
  host.id = 'pdf-export-host'
  host.style.position = 'fixed'
  host.style.left = '-10000px'
  host.style.top = '0'
  host.style.width = '794px'      // ~ A4 en 96dpi
  host.style.background = '#ffffff'
  document.body.appendChild(host)

  // 2) Forzar tema claro en el HTML durante la exportación
  const html = document.documentElement
  const prevTheme = html.getAttribute('data-theme')
  html.setAttribute('data-theme', 'light')

  // 3) Montar React en ese host
  const root = createRoot(host)
  root.render(<PrintLayout />)

  // Esperar a que pinte
  await waitFrames(3)

  // 4) Import dinámico de html2pdf (ahorra tamaño en el bundle inicial)
  const mod = await import('html2pdf.js')
  const html2pdf = mod.default

  const opt = {
    margin: [10, 10, 12, 10],
    filename,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['css', 'legacy'] },
  }

  try {
    await html2pdf().set(opt).from(host).save()
  } finally {
    // 5) limpieza
    root.unmount()
    document.body.removeChild(host)
    html.setAttribute('data-theme', prevTheme || 'dark')
  }
}

function waitFrames(n) {
  return new Promise((resolve) => {
    let i = 0
    const tick = () => {
      i++
      if (i >= n) resolve()
      else requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}
