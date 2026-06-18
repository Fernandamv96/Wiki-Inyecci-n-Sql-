import Inicio from '../pages/Inicio.jsx'
import QueEs from '../pages/QueEs.jsx'
import ComoFunciona from '../pages/ComoFunciona.jsx'
import EjemploVisual from '../pages/EjemploVisual.jsx'
import Riesgos from '../pages/Riesgos.jsx'
import Prevencion from '../pages/Prevencion.jsx'
import Conclusion from '../pages/Conclusion.jsx'
import Icon from './Icons.jsx'

/**
 * PrintLayout — Renderiza TODAS las páginas de la wiki en
 * secuencia, con saltos de página entre secciones, listo para
 * pasar a PDF con html2pdf.js.
 *
 * Importante: aquí los componentes reciben un `onNavigate`
 * "no-op" porque solo nos interesa el render, no la navegación.
 */
const noop = () => {}

const SECTIONS = [
  { key: 'portada',     title: 'Portada',                node: (
    <div className="print-cover">
      <div className="print-cover-badge">
        <Icon name="shield" size={14} /> Wiki educativa
      </div>
      <h1>SQL Injection</h1>
      <h2>Aprende qué es, cómo funciona y cómo prevenirla</h2>
      <p className="print-cover-lead">
        Material didáctico para estudiantes de desarrollo web y
        ciberseguridad. Sin payloads maliciosos reales: solo
        explicaciones y una simulación segura.
      </p>
      <div className="print-cover-meta">
        <span>Tema: Inyección SQL (SQLi)</span>
        <span>Nivel: Principiante</span>
        <span>Tipo: Wiki educativa</span>
      </div>
    </div>
  )},
  { key: 'inicio',      title: 'Inicio',                 node: <Inicio      onNavigate={noop} /> },
  { key: 'queEs',       title: '¿Qué es?',               node: <QueEs       onNavigate={noop} /> },
  { key: 'comoFunciona',title: '¿Cómo funciona?',        node: <ComoFunciona onNavigate={noop} /> },
  { key: 'ejemplo',     title: 'Ejemplo visual',         node: <EjemploVisual onNavigate={noop} /> },
  { key: 'riesgos',     title: 'Riesgos',                node: <Riesgos     onNavigate={noop} /> },
  { key: 'prevencion',  title: 'Prevención',             node: <Prevencion  onNavigate={noop} /> },
  { key: 'conclusion',  title: 'Conclusión',             node: <Conclusion  onNavigate={noop} /> },
]

export default function PrintLayout() {
  return (
    <div className="print-root" data-theme="light">
      {SECTIONS.map((s, i) => (
        <section
          key={s.key}
          className="print-section"
          // El primer section no necesita page-break-before
          style={i === 0 ? undefined : { pageBreakBefore: 'always' }}
        >
          {s.node}
        </section>
      ))}

      <footer className="print-footer">
        <p>
          Wiki educativa sobre Inyección SQL — Hecho con 💚 para aprender
          ciberseguridad. Este PDF es 100% educativo y no contiene
          payloads ejecutables.
        </p>
      </footer>
    </div>
  )
}
