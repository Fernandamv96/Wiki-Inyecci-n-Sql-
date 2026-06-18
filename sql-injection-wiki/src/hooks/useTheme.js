import { useEffect, useState, useCallback } from 'react'

/**
 * useTheme — hook para alternar entre modo claro y oscuro.
 *
 * Estrategia:
 *  - Persistimos la elección en localStorage.
 *  - Aplicamos el tema al <html> como data-theme="light|dark".
 *  - Devolvemos un toggle y la posibilidad de setearlo manual.
 *
 * Las variables CSS de cada tema están definidas en global.css.
 */
const STORAGE_KEY = 'sql-wiki:theme'

function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  // Si no hay preferencia guardada, respetamos la del SO.
  const prefersLight =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (_) {
      // Si localStorage no está disponible, seguimos sin persistir.
    }
  }, [theme])

  const toggle = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  const setTheme = useCallback((t) => {
    if (t === 'light' || t === 'dark') setThemeState(t)
  }, [])

  return { theme, toggle, setTheme }
}
