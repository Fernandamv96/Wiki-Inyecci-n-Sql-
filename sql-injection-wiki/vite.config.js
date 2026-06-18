import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para un proyecto React
export default defineConfig({
  plugins: [react()],
  // Importante para Vercel: rutas tipo /que-es, /riesgos, etc.
  // Si vas a hacer routing real con React Router, considera
  // configurar rewrites. Aquí usamos navegación por estado, así
  // que no es estrictamente necesario.
})
