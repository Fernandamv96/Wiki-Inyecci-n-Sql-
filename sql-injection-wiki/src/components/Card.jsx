/**
 * Card reutilizable con efecto hover.
 * Props:
 *  - title, subtitle, icon: contenido principal
 *  - tone: 'default' | 'success' | 'warning' | 'danger' | 'info'
 *  - children: contenido adicional
 *  - onClick (opcional): si se pasa, la card se vuelve clickeable
 */
export default function Card({
  title,
  subtitle,
  icon,
  tone = 'default',
  children,
  onClick,
}) {
  const Component = onClick ? 'button' : 'div'
  return (
    <Component
      type={onClick ? 'button' : undefined}
      className={`card card--${tone} ${onClick ? 'card--clickable' : ''}`}
      onClick={onClick}
    >
      {(icon || title) && (
        <div className="card-header">
          {icon && <div className="card-icon">{icon}</div>}
          {(title || subtitle) && (
            <div>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      {children && <div className="card-body">{children}</div>}
    </Component>
  )
}
