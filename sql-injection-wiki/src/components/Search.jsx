import { useEffect, useRef, useState, useMemo } from 'react'
import { searchWiki } from '../data/searchIndex.js'
import Icon from './Icons.jsx'

/**
 * Search — Modal de búsqueda global con atajo Ctrl+K (o Cmd+K en Mac).
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: callback para cerrar
 *  - onNavigate: callback para saltar a una página
 */
export default function Search({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  // Resultados filtrados (memo para no recalcular en cada render)
  const results = useMemo(() => searchWiki(query), [query])

  // Al abrir, enfocar el input y limpiar
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [isOpen])

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSelect = (page) => {
    onNavigate(page)
    onClose()
  }

  // Resaltar el término buscado dentro del snippet
  const highlight = (text) => {
    if (!query.trim()) return text
    const q = query.trim()
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
    const parts = text.split(re)
    return parts.map((p, i) =>
      re.test(p) ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>
    )
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Buscar en la wiki…  (prueba: prepared, UNION, ORM)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="search-kbd">Esc</kbd>
        </div>

        <div className="search-body">
          {query.trim() === '' ? (
            <div className="search-hint">
              <Icon name="lightbulb" size={16} />
              <span>
                Escribe algo para buscar. <strong>Ctrl + K</strong> abre
                esta búsqueda desde cualquier parte.
              </span>
            </div>
          ) : results.length === 0 ? (
            <div className="search-hint">
              <Icon name="help" size={16} />
              <span>
                Sin resultados para <strong>"{query}"</strong>. Prueba con
                "prepared", "UNION" o "ORM".
              </span>
            </div>
          ) : (
            <ul className="search-results">
              {results.map((r, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="search-result"
                    onClick={() => handleSelect(r.page)}
                  >
                    <div className="search-result-top">
                      <span className="search-result-section">
                        {r.section}
                      </span>
                      <span className="search-result-page">
                        → {pageLabel(r.page)}
                      </span>
                    </div>
                    <div className="search-result-title">{r.title}</div>
                    <div className="search-result-snippet">
                      {highlight(r.snippet)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-footer">
          <span>{results.length} resultado{results.length === 1 ? '' : 's'}</span>
          <span className="search-tip">↑↓ navegar · Enter abrir</span>
        </div>
      </div>

      {/* Backdrop clickeable para cerrar */}
      <div
        className="search-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  )
}

// Etiqueta legible para mostrar el nombre de la página
function pageLabel(key) {
  const map = {
    inicio: 'Inicio',
    queEs: '¿Qué es?',
    comoFunciona: '¿Cómo funciona?',
    ejemplo: 'Ejemplo visual',
    riesgos: 'Riesgos',
    prevencion: 'Prevención',
    conclusion: 'Conclusión',
  }
  return map[key] || key
}
