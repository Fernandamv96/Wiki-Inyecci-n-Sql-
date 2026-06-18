import Icon from './Icons.jsx'

/**
 * Navbar superior.
 *
 * - En móvil muestra un botón hamburguesa para abrir el sidebar.
 * - En escritorio muestra el título de la página actual
 *   y los botones de tema, búsqueda y export a PDF.
 */
export default function Navbar({
  title,
  onMenuClick,
  theme,
  onToggleTheme,
  onOpenSearch,
  onExportPDF,
}) {
  return (
    <header className="navbar">
      <button
        type="button"
        className="menu-btn"
        onClick={onMenuClick}
        aria-label="Abrir menú de navegación"
      >
        <Icon name="menu" size={22} />
      </button>

      <h1 className="navbar-title">{title}</h1>

      <div className="navbar-actions">
        {/* Búsqueda */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenSearch}
          aria-label="Buscar en la wiki"
          title="Buscar (Ctrl + K)"
        >
          <Icon name="search" size={18} />
          <span className="icon-btn-label">Buscar</span>
          <kbd className="icon-btn-kbd">⌘K</kbd>
        </button>

        {/* Tema claro/oscuro */}
        <button
          type="button"
          className="icon-btn icon-btn--round"
          onClick={onToggleTheme}
          aria-label={
            theme === 'dark'
              ? 'Cambiar a modo claro'
              : 'Cambiar a modo oscuro'
          }
          title={
            theme === 'dark'
              ? 'Cambiar a modo claro'
              : 'Cambiar a modo oscuro'
          }
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>

        {/* Export PDF */}
        <button
          type="button"
          className="icon-btn icon-btn--primary"
          onClick={onExportPDF}
          aria-label="Exportar la wiki a PDF"
          title="Exportar a PDF"
        >
          <Icon name="download" size={18} />
          <span className="icon-btn-label">PDF</span>
        </button>

        {/* Logo textual (solo desktop) */}
        <div className="navbar-badge" title="Proyecto educativo">
          <Icon name="shield" size={18} />
          <span>SQL Wiki</span>
        </div>
      </div>
    </header>
  )
}
