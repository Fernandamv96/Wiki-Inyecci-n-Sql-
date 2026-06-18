/**
 * searchIndex.js — Índice de búsqueda de la wiki.
 *
 * Cada entrada representa un "trozo" de contenido buscable.
 * El motor de búsqueda hace un match simple (case-insensitive)
 * contra `title`, `section`, `snippet` y `keywords`, y asigna
 * un puntaje según dónde cayó el match.
 */
export const searchIndex = [
  // ============== INICIO ==============
  {
    page: 'inicio',
    section: 'Portada',
    title: 'Inicio',
    snippet:
      'Wiki educativa sobre Inyección SQL: aprende qué es, cómo funciona y cómo prevenirla.',
    keywords: ['portada', 'introduccion', 'bienvenida', 'wiki'],
  },

  // ============== ¿QUÉ ES? ==============
  {
    page: 'queEs',
    section: 'Definición',
    title: '¿Qué es la Inyección SQL?',
    snippet:
      'Es un tipo de ataque en el que un atacante introduce código SQL dentro de un campo de texto para manipular la base de datos.',
    keywords: ['definicion', 'ataque', 'sqli', 'sql injection', 'que es'],
  },
  {
    page: 'queEs',
    section: 'Analogía del restaurante',
    title: 'Analogía del restaurante',
    snippet:
      'El mesero anota el pedido y lo lleva a la cocina. Si el cliente añade condiciones trampa, el cocinero se confunde.',
    keywords: ['analogia', 'restaurante', 'mesero', 'ejemplo simple'],
  },
  {
    page: 'queEs',
    section: 'En una frase',
    title: 'En una frase',
    snippet:
      'Una inyección SQL ocurre cuando los datos del usuario se interpretan como código en lugar de como datos.',
    keywords: ['frase', 'resumen', 'concepto'],
  },
  {
    page: 'queEs',
    section: 'Preguntas frecuentes',
    title: 'Preguntas frecuentes',
    snippet:
      '¿Es nuevo? ¿A quién afecta? ¿Por qué sigue vigente? ¿Es ilegal aprenderlo?',
    keywords: ['faq', 'preguntas', 'dudas'],
  },

  // ============== CÓMO FUNCIONA ==============
  {
    page: 'comoFunciona',
    section: 'Paso a paso',
    title: '¿Cómo funciona? Paso a paso',
    snippet:
      '1) El usuario envía datos, 2) el backend arma la query, 3) el atacante manipula el input, 4) la base de datos obedece la nueva orden.',
    keywords: ['pasos', 'flujo', 'ataque', 'mecanica'],
  },
  {
    page: 'comoFunciona',
    section: 'Ejemplo conceptual',
    title: 'Ejemplo conceptual (educativo)',
    snippet:
      'Comparación de una entrada normal (maria/1234) con una manipulada (admin\' OR \'1\'=\'1) y cómo se reescribe la query.',
    keywords: ['ejemplo', 'login', 'concat', 'concatenacion'],
  },
  {
    page: 'comoFunciona',
    section: 'Por qué funciona',
    title: '¿Por qué funciona?',
    snippet:
      'El programador confió en que el input sería solo un dato. La base de datos lo interpretó como parte de la query.',
    keywords: ['por que', 'motivo', 'causa'],
  },

  // ============== EJEMPLO VISUAL ==============
  {
    page: 'ejemplo',
    section: 'Simulación segura',
    title: 'Simulación segura',
    snippet:
      'Mini simulación interactiva: escribe un usuario y observa la query vulnerable vs. la parametrizada. No se ejecuta nada real.',
    keywords: ['simulador', 'simulacion', 'demo', 'interactivo'],
  },
  {
    page: 'ejemplo',
    section: 'Pruebas sugeridas',
    title: 'Pruebas sugeridas (educativas)',
    snippet:
      'Prueba con: maria, \' OR \'1\'=\'1, admin\'; --, x\'; DROP TABLE users; --. Son solo strings, no se ejecutan.',
    keywords: ['payloads', 'pruebas', 'ejemplos'],
  },

  // ============== RIESGOS ==============
  {
    page: 'riesgos',
    section: 'Robo de datos',
    title: 'Riesgo: Robo de datos',
    snippet:
      'Un atacante puede extraer tablas enteras: usuarios, contraseñas, correos, datos personales, tarjetas, historiales.',
    keywords: ['robo', 'datos', 'filtracion', 'confidencialidad'],
  },
  {
    page: 'riesgos',
    section: 'Acceso no autorizado',
    title: 'Riesgo: Acceso no autorizado',
    snippet:
      'Con OR \'1\'=\'1\' un atacante puede iniciar sesión como cualquier usuario, incluso el administrador.',
    keywords: ['acceso', 'admin', 'autenticacion', 'login'],
  },
  {
    page: 'riesgos',
    section: 'Modificación o borrado',
    title: 'Riesgo: Modificación o borrado',
    snippet:
      'UPDATE o DELETE inyectados pueden cambiar precios, vaciar tablas o destruir información crítica.',
    keywords: ['modificacion', 'borrado', 'integridad', 'update', 'delete'],
  },
  {
    page: 'riesgos',
    section: 'Escalada al servidor',
    title: 'Riesgo: Escalada al servidor',
    snippet:
      'En motores con permisos elevados, SQLi puede permitir ejecutar comandos en el sistema operativo del servidor.',
    keywords: ['escalada', 'rce', 'servidor', 'os'],
  },
  {
    page: 'riesgos',
    section: 'Caída del servicio',
    title: 'Riesgo: Caída del servicio',
    snippet:
      'Un DROP TABLE o una query muy pesada puede tirar la base de datos y dejar la app fuera de línea.',
    keywords: ['caida', 'dos', 'disponibilidad'],
  },
  {
    page: 'riesgos',
    section: 'Multas',
    title: 'Riesgo: Multas y daño reputacional',
    snippet:
      'Una filtración puede implicar sanciones legales (RGPD) y pérdida de confianza del usuario.',
    keywords: ['multas', 'legal', 'rgpd', 'reputacion'],
  },

  // ============== PREVENCIÓN ==============
  {
    page: 'prevencion',
    section: 'Prepared statements',
    title: 'Regla #1: Prepared statements',
    snippet:
      'Usa placeholders (?) y envía los valores por separado. La base de datos nunca confunde "dato" con "código".',
    keywords: ['prepared', 'parametrizada', 'placeholder', 'defensa'],
  },
  {
    page: 'prevencion',
    section: 'ORM / Query builder',
    title: 'Regla #2: ORM o query builder',
    snippet:
      'Prisma, Sequelize, TypeORM, SQLAlchemy, Eloquent y Django ORM generan consultas parametrizadas por ti.',
    keywords: ['orm', 'prisma', 'sequelize', 'sqlalchemy'],
  },
  {
    page: 'prevencion',
    section: 'Validación',
    title: 'Regla #3: Validar y sanitizar entradas',
    snippet:
      'Valida el tipo, limita la longitud, usa whitelists. Sanitiza datos que se van a renderizar.',
    keywords: ['validacion', 'sanitizar', 'whitelist'],
  },
  {
    page: 'prevencion',
    section: 'Menor privilegio',
    title: 'Menor privilegio',
    snippet:
      'El usuario de la DB con el que se conecta tu app no debería tener DROP, ALTER, ni acceso a tablas que no necesita.',
    keywords: ['privilegios', 'permisos', 'menor privilegio'],
  },
  {
    page: 'prevencion',
    section: 'Errores SQL',
    title: 'No expongas errores SQL',
    snippet:
      'Un error detallado le da pistas al atacante. Captura los errores y muestra algo genérico.',
    keywords: ['errores', 'logs', 'debug'],
  },
  {
    page: 'prevencion',
    section: 'WAF',
    title: 'WAF (Web Application Firewall)',
    snippet:
      'No sustituye las buenas prácticas, pero bloquea patrones conocidos. Úsalo como capa extra.',
    keywords: ['waf', 'firewall'],
  },
  {
    page: 'prevencion',
    section: 'Auditorías',
    title: 'Auditorías y análisis estático',
    snippet:
      'SQLMap, SonarQube, Snyk y Semgrep pueden detectar consultas vulnerables antes de producción.',
    keywords: ['auditoria', 'analisis estatico', 'sqlmap', 'sonarqube', 'snyk', 'semgrep'],
  },
  {
    page: 'prevencion',
    section: 'Checklist',
    title: 'Checklist interactivo',
    snippet:
      'Marca las prácticas que ya aplicas en tus proyectos y mira tu progreso.',
    keywords: ['checklist', 'lista', 'progreso'],
  },

  // ============== CONCLUSIÓN ==============
  {
    page: 'conclusion',
    section: 'Resumen',
    title: 'Resumen en 5 puntos',
    snippet:
      'Qué es, por qué sigue vigente, sus consecuencias, cómo defenderte con prepared statements y otras prácticas.',
    keywords: ['resumen', 'conclusion', '5 puntos'],
  },
  {
    page: 'conclusion',
    section: 'Texto para exposición',
    title: 'Texto listo para tu exposición',
    snippet:
      'Párrafo listo para leer en clase: definición, impacto y cómo se previene la inyección SQL.',
    keywords: ['exposicion', 'presentacion', 'discurso', 'parrafo'],
  },
  {
    page: 'conclusion',
    section: 'Ciberseguridad',
    title: 'La ciberseguridad empieza por la educación',
    snippet:
      'Practica en labs legales como HackTheBox, TryHackMe, DVWA, PortSwigger Web Security Academy.',
    keywords: ['educacion', 'labs', 'hackthebox', 'tryhackme', 'dvwa', 'portswigger'],
  },
]

/**
 * Búsqueda simple con scoring.
 * Devuelve un array de resultados ordenados por relevancia.
 */
export function searchWiki(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const results = []
  for (const item of searchIndex) {
    let score = 0
    const t = item.title.toLowerCase()
    const s = item.section.toLowerCase()
    const sn = item.snippet.toLowerCase()
    const k = item.keywords.join(' ').toLowerCase()

    if (t.includes(q)) score += 10
    if (s.includes(q)) score += 5
    if (sn.includes(q)) score += 3
    if (k.includes(q)) score += 2
    if (t.startsWith(q)) score += 4

    if (score > 0) results.push({ ...item, score })
  }

  results.sort((a, b) => b.score - a.score)
  return results
}
