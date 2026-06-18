import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Search from './components/Search.jsx'
import Inicio from './pages/Inicio.jsx'
import QueEs from './pages/QueEs.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import EjemploVisual from './pages/EjemploVisual.jsx'
import Riesgos from './pages/Riesgos.jsx'
import Prevencion from './pages/Prevencion.jsx'
import Conclusion from './pages/Conclusion.jsx'
import { useTheme } from './hooks/useTheme.js'
import { exportWikiToPDF } from './utils/pdfExport.jsx'
import './styles/components.css'

/**
 * Componente raíz de la aplicación.
 *
 * Estrategia de navegación:
 *  - Mapa de páginas en `PAGES`. Para añadir una nueva, basta con
 *    meter un componente y agregarlo al mapa.
 *  - Persistimos la última página en localStorage.
 *  - Atajo Ctrl/Cmd + K abre la búsqueda global.
 */

const PAGES = {
  inicio: { component: Inicio, title: 'Inicio' },
  queEs: { component: QueEs, title: '¿Qué es la Inyección SQL?' },
  comoFunciona: { component: ComoFunciona, title: '¿Cómo funciona?' },
  ejemplo: { component: EjemploVisual, title: 'Ejemplo visual' },
  riesgos: { component: Riesgos, title: 'Riesgos' },
  prevencion: { component: Prevencion, title: 'Prevención' },
  conclusion: { component: Conclusion, title: 'Conclusión' },
}

const STORAGE_PAGE = 'sql-wiki:currentPage'

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_PAGE) : null
    return saved && PAGES[saved] ? saved : 'inicio'
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  // Persistir página y resetear scroll al cambiar
  useEffect(() => {
    localStorage.setItem(STORAGE_PAGE, currentPage)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Atajo global Ctrl/Cmd + K para abrir la búsqueda
  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key === 'k' || e.key === 'K'
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const PageComponent = PAGES[currentPage].component
  const pageTitle = PAGES[currentPage].title

  // Exportar a PDF con feedback visual
  const handleExportPDF = useCallback(async () => {
    if (exporting) return
    setExporting(true)
    try {
      await exportWikiToPDF({ filename: 'sql-injection-wiki.pdf' })
    } catch (err) {
      // Si falla, al menos avisamos en consola
      // (en producción esto se podría mostrar en una tostada)
      // eslint-disable-next-line no-console
      console.error('Error exportando a PDF:', err)
      alert('Hubo un error al generar el PDF. Revisa la consola.')
    } finally {
      setExporting(false)
    }
  }, [exporting])

  return (
    <div className="app-shell" data-theme={theme}>
      <Sidebar
        pages={PAGES}
        current={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <Navbar
          title={pageTitle}
          onMenuClick={() => setSidebarOpen((v) => !v)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => setSearchOpen(true)}
          onExportPDF={handleExportPDF}
        />
        <main className="app-content">
          <PageComponent onNavigate={setCurrentPage} />
        </main>
        <footer className="app-footer">
          <p>
            Hecho con 💚 para aprender ciberseguridad — Proyecto educativo
            sin contenido malicioso real.
          </p>
        </footer>

        {/* Banner mientras se exporta el PDF */}
        {exporting && (
          <div className="export-banner" role="status" aria-live="polite">
            <span className="export-spinner" aria-hidden="true" />
            Generando PDF, espera unos segundos…
          </div>
        )}
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Modal de búsqueda */}
      <Search
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={setCurrentPage}
      />
    </div>
  )
}
