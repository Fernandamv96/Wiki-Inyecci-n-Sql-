import { useState } from 'react'
import Icon from './Icons.jsx'

/**
 * Accordion / contenido desplegable.
 * Props:
 *  - items: [{ id, title, content (ReactNode) }]
 *  - defaultOpen: id del item abierto por defecto
 */
export default function Accordion({ items, defaultOpen }) {
  const [openId, setOpenId] = useState(defaultOpen ?? null)

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <Icon name="chevron" size={18} className={isOpen ? 'rot' : ''} />
            </button>
            <div className="accordion-content" hidden={!isOpen}>
              <div className="accordion-content-inner">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
