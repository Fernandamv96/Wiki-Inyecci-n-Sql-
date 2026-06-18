/**
 * payloads.js — Catálogo de payloads clásicos de SQL Injection
 * explicados token por token. Pensado 100% para educación:
 * aquí NO se ejecuta nada, solo se muestra la forma del string.
 *
 * Cada payload tiene:
 *  - id, name, description
 *  - payload: el string exacto (o null para "libre")
 *  - usedIn: dónde se mete (campo de login, search, etc.)
 *  - effect: qué hace conceptualmente
 *  - breakdown: array de { token, role, explanation }
 *
 * Los `role` se usan solo para colorear el token en la UI.
 */

// Colores de los roles (consumidos por SqlSimulator.jsx)
export const ROLE_COLORS = {
  'string-end':   { bg: 'rgba(239, 68, 68, .18)',  fg: '#fca5a5' },
  'keyword':      { bg: 'rgba(59, 130, 246, .18)', fg: '#93c5fd' },
  'always-true':  { bg: 'rgba(245, 158, 11, .22)', fg: '#fde68a' },
  'comment':      { bg: 'rgba(148, 163, 184, .2)', fg: '#cbd5e1' },
  'destructive':  { bg: 'rgba(239, 68, 68, .25)',  fg: '#fecaca' },
  'union':        { bg: 'rgba(168, 85, 247, .2)',  fg: '#d8b4fe' },
  'boolean':      { bg: 'rgba(56, 189, 248, .18)', fg: '#bae6fd' },
  'string':       { bg: 'rgba(16, 185, 129, .18)', fg: '#86efac' },
  'operator':     { bg: 'rgba(244, 114, 182, .18)', fg: '#fbcfe8' },
  'plain':        { bg: 'transparent',             fg: 'inherit' },
}

export const payloads = [
  {
    id: 'free',
    name: '✍️  Libre',
    description:
      'Escribe lo que quieras y observa cómo se construye la query vulnerable.',
    payload: null,
    usedIn: 'Cualquier input',
    effect: 'Depende de lo que escribas.',
    breakdown: [],
  },
  {
    id: 'auth-bypass',
    name: '🔓 Bypass de autenticación',
    description:
      'El clásico: añade una condición que siempre es verdadera y la query devuelve todos los usuarios.',
    payload: "' OR '1'='1",
    usedIn: 'Campo "usuario" en un login vulnerable',
    effect:
      'La condición WHERE se vuelve siempre verdadera, devolviendo el primer usuario (a menudo admin).',
    breakdown: [
      {
        token: "'",
        role: 'string-end',
        explanation:
          'Cierra la cadena de texto que abrió la aplicación. Sin esto, todo lo que sigue sería tratado como un valor normal.',
      },
      {
        token: ' OR ',
        role: 'keyword',
        explanation:
          'Operador lógico "O": si CUALQUIERA de las dos condiciones es verdadera, la fila se devuelve.',
      },
      {
        token: "'1'='1",
        role: 'always-true',
        explanation:
          'Una comparación trivialmente verdadera. Como las dos cadenas son idénticas, el motor siempre la evalúa como TRUE.',
      },
    ],
  },
  {
    id: 'comment-bypass',
    name: '🗨️  Bypass con comentario (--)',
    description:
      'Escribe un usuario válido y "anula" la parte de la contraseña usando un comentario SQL.',
    payload: "admin'-- ",
    usedIn: 'Campo "usuario" (la contraseña se ignora)',
    effect:
      'El motor trata la contraseña como un comentario y no la evalúa. Si el usuario existe, loguea.',
    breakdown: [
      {
        token: 'admin',
        role: 'plain',
        explanation:
          'Un nombre de usuario real (o el que el atacante quiera impersonar).',
      },
      {
        token: "'",
        role: 'string-end',
        explanation:
          'Cierra la cadena abierta por la app tras el valor del input.',
      },
      {
        token: '-- ',
        role: 'comment',
        explanation:
          'Inicia un comentario de una sola línea en SQL. Todo lo que viene después es IGNORADO por el motor.',
      },
      {
        token: 'AND password = ...',
        role: 'comment',
        explanation:
          'Esto YA NO se ejecuta. La verificación de contraseña queda anulada.',
      },
    ],
  },
  {
    id: 'union-select',
    name: '🔗 UNION SELECT',
    description:
      'Une el resultado de la query original con otra que tú controlas, extrayendo datos sensibles.',
    payload: "' UNION SELECT username, password FROM users-- ",
    usedIn: 'Cualquier campo cuyo resultado se muestre (búsquedas, listados)',
    effect:
      'La app imprime además los usernames y contraseñas (u otros campos) de la tabla users.',
    breakdown: [
      {
        token: "'",
        role: 'string-end',
        explanation: 'Cierra la cadena del input.',
      },
      {
        token: ' UNION SELECT ',
        role: 'union',
        explanation:
          'UNION combina los resultados de dos queries. Si tienen el mismo número de columnas, MySQL los une en una sola respuesta.',
      },
      {
        token: 'username, password',
        role: 'plain',
        explanation:
          'Las columnas que queremos "colar" en la respuesta. Deben coincidir en número con la query original.',
      },
      {
        token: ' FROM users',
        role: 'plain',
        explanation:
          'La tabla de la que queremos sacar los datos. La app original nunca debió permitirnos elegirla.',
      },
      {
        token: '-- ',
        role: 'comment',
        explanation:
          'Comenta la cola de la query original para que no rompa la sintaxis.',
      },
    ],
  },
  {
    id: 'drop-table',
    name: '💣 DROP TABLE',
    description:
      'Payload clásico de los libros de texto. Termina la primera query con ";" y lanza una instrucción destructiva.',
    payload: "x'; DROP TABLE users; --",
    usedIn: 'Cualquier input (en código vulnerable con queries apiladas)',
    effect:
      'Borra la tabla users completa. La mayoría de motores modernos lo bloquean por defecto, pero es un ejemplo clásico.',
    breakdown: [
      {
        token: 'x',
        role: 'plain',
        explanation:
          'Un carácter cualquiera para que la query original no falle antes del cierre.',
      },
      {
        token: "'",
        role: 'string-end',
        explanation: 'Cierra la cadena del input.',
      },
      {
        token: ';',
        role: 'operator',
        explanation:
          'Termina la primera query. Esto SOLO funciona si la conexión permite "stacked queries".',
      },
      {
        token: 'DROP TABLE users',
        role: 'destructive',
        explanation:
          'Borra la tabla completa. La app y todos los usuarios pierden acceso inmediatamente.',
      },
      {
        token: ';',
        role: 'operator',
        explanation: 'Separador de instrucciones.',
      },
      {
        token: '--',
        role: 'comment',
        explanation: 'Comenta el resto (por si la query original seguía).',
      },
    ],
  },
  {
    id: 'boolean-blind',
    name: '🕵️ Boolean Blind',
    description:
      'No devuelve datos extra, pero hace que la app se comporte diferente si una condición es verdadera o falsa.',
    payload: "' AND 1=1-- ",
    usedIn: 'Endpoints donde la app cambia su respuesta según si hay resultados o no.',
    effect:
      'Sirve para "adivinar" datos carácter a carácter comparando respuestas (la página cambia, o no).',
    breakdown: [
      {
        token: "'",
        role: 'string-end',
        explanation: 'Cierra la cadena del input.',
      },
      {
        token: ' AND ',
        role: 'keyword',
        explanation:
          'Operador Y: la fila se devuelve SOLO si la condición extra también es verdadera.',
      },
      {
        token: '1=1',
        role: 'boolean',
        explanation:
          'Una comparación trivialmente verdadera. El atacante empieza así para verificar que el canal "funciona".',
      },
      {
        token: '-- ',
        role: 'comment',
        explanation: 'Comenta la cola de la query original.',
      },
    ],
  },
]
