import { useState, useMemo } from 'react'
import Icon from './Icons.jsx'
import { payloads, ROLE_COLORS } from '../data/payloads.js'

/**
 * SqlSimulator — Simulación educativa de Inyección SQL.
 *
 * - Selector de payloads: el usuario puede escribir libremente o
 *   elegir un payload clásico pre-cargado con desglose token a token.
 * - Muestra la query vulnerable (concatenación) y la parametrizada
 *   (prepared statement) como texto. NO se ejecuta nada real.
 * - Detecta payloads sospechosos con una regex SOLO para colorear
 *   la respuesta (no para ejecutar nada).
 */
export default function SqlSimulator() {
  const [selectedId, setSelectedId] = useState('free')
  const selected = payloads.find((p) => p.id === selectedId) || payloads[0]

  // Si el payload es fijo, inicializamos el input con su string.
  // Si es "free", dejamos que el usuario escriba lo que quiera.
  const [input, setInput] = useState('')

  const setPayload = (id) => {
    setSelectedId(id)
    const p = payloads.find((x) => x.id === id)
    setInput(p?.payload ?? '')
  }

  // Construimos la query "vulnerable" (concatenación) como string
  // SOLO con fines didácticos. No se ejecuta.
  const unsafeQuery = `SELECT * FROM users WHERE username = '${input}';`

  // Versión "segura" usando placeholder (no concatena el input)
  const safeQuery = `SELECT * FROM users WHERE username = ?;`

  // Heurística visual: marca como sospechoso si coincide con patrones
  // clásicos. No hace nada, solo cambia el mensaje de resultado.
  const suspicious = /('|--|;|or\s+1=1|union\s+select|drop\s+table)/i.test(input)

  const result = (() => {
    if (!input.trim()) {
      return {
        tone: 'muted',
        text: 'Selecciona un payload o escribe algo para ver la simulación.',
      }
    }
    if (suspicious) {
      return {
        tone: 'danger',
        text:
          '⚠️ La query se ha alterado. El motor interpretará una instrucción distinta a la que el programador quería. En un sistema real, esto podría filtrar TODOS los usuarios.',
      }
    }
    return {
      tone: 'success',
      text: `✅ La query parece normal: buscaría al usuario "${input}".`,
    }
  })()

  // Para el desglose: si hay un breakdown definido, lo usamos; si no,
  // mostramos un mensaje genérico.
  const breakdown = useMemo(() => selected.breakdown || [], [selected])

  return (
    <div className="sim">
      <div className="sim-header">
        <h4>Simulación segura (no ejecuta nada real)</h4>
        <p className="sim-subtitle">
          Imagina un formulario de login. Lo que el usuario escribe se
          concatena dentro de la consulta SQL.
        </p>
      </div>

      {/* Selector de payloads */}
      <div className="sim-payloads" role="tablist" aria-label="Payloads">
        {payloads.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={selectedId === p.id}
            className={`sim-pill ${selectedId === p.id ? 'sim-pill--active' : ''}`}
            onClick={() => setPayload(p.id)}
            type="button"
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="sim-desc">{selected.description}</p>

      <label className="sim-label" htmlFor="sim-input">
        Usuario (puedes editar el texto aunque haya un payload seleccionado):
      </label>
      <input
        id="sim-input"
        type="text"
        className="sim-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ej: admin   o prueba:  ' OR '1'='1"
        autoComplete="off"
        spellCheck="false"
      />

      <div className="sim-queries">
        <div className="sim-query sim-query--bad">
          <div className="sim-query-label">
            <Icon name="warning" size={16} /> Concatenación directa (VULNERABLE)
          </div>
          <pre className="sim-pre">
            <code>{unsafeQuery}</code>
          </pre>
        </div>

        <div className="sim-query sim-query--good">
          <div className="sim-query-label">
            <Icon name="shield" size={16} /> Prepared statement (SEGURO)
          </div>
          <pre className="sim-pre">
            <code>
              {safeQuery}
              {'\n'}
              <span className="sim-comment">
                {'// el input se envía como parámetro:'}
              </span>
              {'\n'}
              <span className="sim-comment">{'// db.query(safe, ['}</span>
              <span className="sim-string">{`"${input}"`}</span>
              <span className="sim-comment">{'])'}</span>
            </code>
          </pre>
        </div>
      </div>

      <div className={`sim-result sim-result--${result.tone}`}>
        {result.text}
      </div>

      {/* ====== DESGLOSE TOKEN A TOKEN ====== */}
      {breakdown.length > 0 ? (
        <div className="sim-breakdown">
          <h5 className="sim-breakdown-title">
            <Icon name="flow" size={16} /> Desglose del payload
          </h5>

          <div className="sim-meta">
            <div>
              <span className="sim-meta-label">¿Dónde se mete?</span>
              <span className="sim-meta-value">{selected.usedIn}</span>
            </div>
            <div>
              <span className="sim-meta-label">¿Qué logra?</span>
              <span className="sim-meta-value">{selected.effect}</span>
            </div>
          </div>

          <div className="sim-tokens" aria-label="Tokens del payload">
            {breakdown.map((t, i) => {
              const c = ROLE_COLORS[t.role] || ROLE_COLORS.plain
              return (
                <span
                  key={i}
                  className="sim-token"
                  style={{ background: c.bg, color: c.fg }}
                >
                  {t.token}
                </span>
              )
            })}
          </div>

          <ol className="sim-expl">
            {breakdown.map((t, i) => {
              const c = ROLE_COLORS[t.role] || ROLE_COLORS.plain
              return (
                <li key={i}>
                  <code
                    className="sim-expl-token"
                    style={{ background: c.bg, color: c.fg }}
                  >
                    {t.token}
                  </code>
                  <span>{t.explanation}</span>
                </li>
              )
            })}
          </ol>
        </div>
      ) : (
        <div className="sim-tip">
          <Icon name="lightbulb" size={16} />{' '}
          <span>
            <strong>Dato clave:</strong> en la versión vulnerable, el input
            se mete <em>tal cual</em> dentro de la query. Selecciona un
            payload de arriba para ver el desglose línea por línea.
          </span>
        </div>
      )}
    </div>
  )
}
