# 🛡️ SQL Injection Wiki

> Wiki educativa sobre **Inyección SQL**: qué es, cómo funciona, ejemplos, riesgos y, sobre todo, cómo prevenirla. Pensada para estudiantes principiantes y para presentación/exposición universitaria.

![status](https://img.shields.io/badge/status-ready-brightgreen) ![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-blue) ![deploy](https://img.shields.io/badge/deploy-Vercel-black)

---

## ✨ Características

- 🎓 **7 secciones** educativas (Inicio, ¿Qué es?, ¿Cómo funciona?, Ejemplo visual, Riesgos, Prevención, Conclusión).
- 🧪 **Simulación segura** con **6 payloads** clásicos y **desglose token a token** (bypass de auth, comentario, UNION SELECT, DROP TABLE, boolean blind).
- 🔎 **Búsqueda global** con `Ctrl/Cmd + K` que indexa todas las secciones.
- 📄 **Export a PDF** multipágina de toda la wiki (un solo click).
- 🌗 **Modo claro / oscuro** con toggle y persistencia.
- ✅ **Checklist interactivo** de buenas prácticas con barra de progreso.
- 🪗 **Acordeones**, tarjetas con hover, animaciones suaves.
- 📱 Diseño moderno **oscuro + acento verde/azul**, responsive (móvil/tablet/escritorio).
- 🚀 Listo para **GitHub + Vercel**.

---

## 🚀 Empezar en local

Necesitas **Node.js 18+** y `npm`.

```bash
# 1) Clonar el repo o descargarlo
git clone https://github.com/TU-USUARIO/sql-injection-wiki.git
cd sql-injection-wiki

# 2) Instalar dependencias
npm install

# 3) Arrancar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

Para generar el build de producción:

```bash
npm run build
npm run preview   # vista previa local del build
```

---

## 📁 Estructura del proyecto

```
sql-injection-wiki/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Accordion.jsx
│   │   ├── Card.jsx
│   │   ├── Icons.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrintLayout.jsx
│   │   ├── Search.jsx
│   │   ├── Sidebar.jsx
│   │   └── SqlSimulator.jsx
│   ├── data/
│   │   ├── payloads.js
│   │   └── searchIndex.js
│   ├── hooks/
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── Conclusion.jsx
│   │   ├── ComoFunciona.jsx
│   │   ├── EjemploVisual.jsx
│   │   ├── Inicio.jsx
│   │   ├── Prevencion.jsx
│   │   ├── QueEs.jsx
│   │   └── Riesgos.jsx
│   ├── styles/
│   │   ├── components.css
│   │   └── global.css
│   ├── utils/
│   │   └── pdfExport.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

> La navegación se hace con un simple `useState` en `App.jsx` (sin react-router). Esto mantiene la app ligera y suficiente para una wiki.

### Atajos y features

| Acción                       | Cómo                                       |
| ---------------------------- | ------------------------------------------ |
| Cambiar tema claro/oscuro    | Botón ☀︎/☾ en la navbar                    |
| Abrir búsqueda               | Botón **Buscar** o **Ctrl/Cmd + K**        |
| Exportar a PDF               | Botón **PDF** en la navbar                 |
| Ver desglose de un payload   | Pestañas en la simulación (Ejemplo visual) |

---

## ⬆️ Subir a GitHub (paso a paso)

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Crea un nuevo repositorio: botón **New repository**.
   - Nombre sugerido: `sql-injection-wiki`
   - Visibilidad: **Public** (si quieres desplegarlo en Vercel free sin fricciones).
   - **No** inicialices con README ni .gitignore (ya los tienes).
3. En la carpeta del proyecto, abre la terminal y ejecuta:

```bash
git init
git add .
git commit -m "feat: wiki educativa sobre inyección SQL"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sql-injection-wiki.git
git push -u origin main
```

Cuando lo pida, autenticarte con tu usuario y un **Personal Access Token** (PAT) si tienes 2FA. Crea uno en `Settings → Developer settings → Personal access tokens`.

---

## ▲ Desplegar en Vercel (paso a paso)

**Opción A — desde la web (la más fácil):**

1. Entra a [vercel.com](https://vercel.com) y haz login con tu cuenta de GitHub.
2. Click en **Add New → Project**.
3. Selecciona el repo `sql-injection-wiki` de la lista.
4. Vercel detecta automáticamente que es Vite:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click en **Deploy**. En 1-2 minutos tendrás una URL pública del tipo `sql-injection-wiki.vercel.app`.
6. Cada `git push` redeplega automáticamente. ✨

**Opción B — con la CLI:**

```bash
npm i -g vercel
vercel login
vercel        # primer deploy (sigue las preguntas)
vercel --prod # promueve a producción
```

> No necesitas configurar nada extra: Vercel entiende Vite sin `vercel.json`.

---

## 🛠️ Personalización rápida

- **Colores:** edita las variables CSS en `src/styles/global.css` (sección `:root`).
- **Agregar una página nueva:**
  1. Crea `src/pages/MiPagina.jsx`.
  2. Añádela al mapa `PAGES` en `src/App.jsx`.
  3. Agrega un ícono opcional en `src/components/Icons.jsx` y mapea la key en `Sidebar.jsx`.
- **Textos:** cada página está en `src/pages/*.jsx` y es 100% JSX, sin Markdown raro.

---

## 🔐 Nota ética

Este proyecto es **estrictamente educativo**. No contiene payloads reales, no se conecta a ninguna base de datos y la simulación solo muestra la *forma textual* de las consultas para enseñar el concepto. Si quieres practicar SQLi, hazlo siempre en entornos controlados y legales (PortSwigger Web Security Academy, DVWA, HackTheBox, TryHackMe).

---

Hecho con 💚 para aprender ciberseguridad.
