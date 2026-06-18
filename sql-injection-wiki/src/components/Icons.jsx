/**
 * Mini set de íconos SVG inline (sin dependencias externas).
 * Props:
 *  - name: string con el nombre del ícono
 *  - size: número en px
 *  - className: clase opcional
 */
const ICONS = {
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="4" width="6" height="6" rx="1" />
      <rect x="15" y="4" width="6" height="6" rx="1" />
      <rect x="9" y="14" width="6" height="6" rx="1" />
      <path d="M6 10v3h12v-3" />
      <path d="M12 13v1" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polygon points="10,8 16,12 10,16" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 3.86l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.14l-8-14a2 2 0 0 0-3.4 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  dot: (
    <>
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  chevron: (
    <>
      <polyline points="6 9 12 15 18 9" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  bug: (
    <>
      <rect x="8" y="7" width="8" height="13" rx="4" />
      <path d="M3 12h5M16 12h5" />
      <path d="M12 3v4" />
      <path d="M5 7l3 2M19 7l-3 2M5 17l3-2M19 17l-3-2" />
    </>
  ),
  list: (
    <>
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="5" cy="6" r="1.2" />
      <circle cx="5" cy="12" r="1.2" />
      <circle cx="5" cy="18" r="1.2" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.6 1 2.5h6c0-.9.3-1.8 1-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 19c-1 1-1 3-1 3s2 0 3-1l1-2-3-1z" />
      <path d="M14 6c4 0 5 2 5 5l-7 7c-1-1-3-3-4-4l6-8z" />
      <circle cx="15" cy="9" r="1.4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" rx="4" ry="4" />
      <path d="M11 12l9-9" />
      <path d="M16 7l3 3" />
    </>
  ),
  // ----- nuevos íconos para las features -----
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  moon: (
    <>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.5" y2="16.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="5" y1="20" x2="19" y2="20" />
    </>
  ),
  print: (
    <>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '' }) {
  const path = ICONS[name] || ICONS.dot
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
