import Icon from './Icons.jsx'

/**
 * Sidebar de navegación.
 * Recibe el mapa de páginas y resalta la actual.
 *
 * Props:
 *  - pages: objeto { key: { component, title } }
 *  - current: string con la key de la página activa
 *  - onNavigate: función para cambiar de página
 *  - isOpen: boolean para abrir/cerrar en móvil
 *  - onClose: callback para cerrar el sidebar en móvil
 */

// Íconos sugeridos para cada sección (sólo decorativos)
const ICONS_BY_KEY = {
  inicio: 'home',
  queEs: 'help',
  comoFunciona: 'flow',
  ejemplo: 'play',
  riesgos: 'warning',
  prevencion: 'shield',
  conclusion: 'check',
}

export default function Sidebar({ pages, current, onNavigate, isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-logo" aria-hidden="true">
          <Icon name="database" size={22} />
        </div>
        <div>
          <strong>SQL Injection</strong>
          <span>Wiki educativa</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación principal">
        <ul>
          {Object.entries(pages).map(([key, { title }]) => {
            const active = key === current
            return (
              <li key={key}>
                <button
                  type="button"
                  className={`nav-item ${active ? 'nav-item--active' : ''}`}
                  onClick={() => onNavigate(key)}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon name={ICONS_BY_KEY[key] || 'dot'} size={18} />
                  <span>{title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="nav-item nav-item--close"
          onClick={onClose}
        >
          <Icon name="close" size={18} />
          <span>Cerrar</span>
        </button>
      </div>
    </aside>
  )
}
