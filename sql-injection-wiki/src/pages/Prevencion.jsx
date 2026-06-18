import { useState } from 'react'
import Accordion from '../components/Accordion.jsx'
import Icon from '../components/Icons.jsx'

/**
 * Página "Prevención".
 * - Buenas prácticas
 * - Comparación vulnerable vs seguro
 * - Checklist interactivo
 */
export default function Prevencion({ onNavigate }) {
  // Checklist de buenas prácticas (educativas)
  const checklistInicial = [
    { id: 'prepared', label: 'Uso prepared statements / queries parametrizadas' },
    { id: 'orm', label: 'Uso un ORM o query builder seguro' },
    { id: 'validate', label: 'Valido entradas en backend (no solo en frontend)' },
    { id: 'principle', label: 'Aplico el principio de menor privilegio en la DB' },
    { id: 'errors', label: 'No muestro errores SQL al usuario final' },
    { id: 'waf', label: 'Considero un WAF (Web Application Firewall) como capa extra' },
  ]

  const [checked, setChecked] = useState({})

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

  const total = checklistInicial.length
  const done = Object.values(checked).filter(Boolean).length
  const progress = Math.round((done / total) * 100)

  return (
    <article className="page">
      <header className="page-header">
        <h2>Prevención</h2>
        <p className="page-lead">
          La inyección SQL se previene con disciplina y las herramientas
          correctas. Aquí van las reglas de oro.
        </p>
      </header>

      <section className="block">
        <h3>🥇 Regla #1: prepared statements (consultas parametrizadas)</h3>
        <p>
          Es la defensa más importante. En lugar de concatenar el input
          del usuario dentro del SQL, usas <strong>placeholders</strong>
          (<code>?</code> o <code>:nombre</code>) y envías el valor por
          separado. La base de datos ya nunca confunde "dato" con
          "código".
        </p>

        <div className="code-compare">
          <div className="code-block">
            <div className="code-tag code-tag--bad">❌ Vulnerable</div>
            <pre>
{`// NUNCA hacer esto
const q = "SELECT * FROM users WHERE id = " + id;
db.query(q);`}
            </pre>
          </div>
          <div className="code-block">
            <div className="code-tag code-tag--good">✅ Seguro (parametrizado)</div>
            <pre>
{`// Node.js + mysql2
const q = "SELECT * FROM users WHERE id = ?";
db.query(q, [id]);`}
            </pre>
          </div>
        </div>
      </section>

      <section className="block">
        <h3>🥈 Regla #2: usa un ORM o query builder</h3>
        <p>
          Frameworks como <em>Prisma</em>, <em>Sequelize</em>,
          <em>TypeORM</em>, <em>SQLAlchemy</em>, <em>Eloquent</em> o
          <em> Django ORM</em> generan consultas parametrizadas por
          ti. Reducen el riesgo de escribir SQLi "por accidente".
        </p>
        <p>
          <strong>Ojo:</strong> un ORM mal usado (concatenando strings
          dentro de <em>raw queries</em>) sigue siendo vulnerable. La
          herramienta ayuda, pero la decisión final la tomas tú.
        </p>
      </section>

      <section className="block">
        <h3>🥉 Regla #3: valida y sanitiza entradas</h3>
        <ul className="list">
          <li>
            <Icon name="dot" size={14} /> Valida el <strong>tipo</strong>
            {' '}(que un id sea número, un email sea email, etc.).
          </li>
          <li>
            <Icon name="dot" size={14} /> Limita la <strong>longitud</strong>
            {' '}de los campos (un nombre de 10 MB es claramente
            malicioso).
          </li>
          <li>
            <Icon name="dot" size={14} /> Usa <strong>whitelists</strong>
            {' '}para valores esperados (ej: un enum).
          </li>
          <li>
            <Icon name="dot" size={14} /> Para datos que se renderizan
            luego, escápalos en el frontend (XSS, no SQLi).
          </li>
        </ul>
      </section>

      <section className="block">
        <h3>🛡️ Otras capas útiles</h3>
        <Accordion
          items={[
            {
              id: 'priv',
              title: 'Principio de menor privilegio',
              content: (
                <p>
                  El usuario de la base de datos con el que se conecta
                  tu app no debería tener permisos de
                  <code> DROP</code>, <code>ALTER</code> ni acceso a
                  tablas que no necesita.
                </p>
              ),
            },
            {
              id: 'err',
              title: 'No expongas errores SQL',
              content: (
                <p>
                  Un mensaje de error detallado ("syntax error near
                  '...'") le da pistas a un atacante. Captura los
                  errores y muestra algo genérico al usuario.
                </p>
              ),
            },
            {
              id: 'waf',
              title: 'WAF (Web Application Firewall)',
              content: (
                <p>
                  No sustituye las buenas prácticas, pero puede
                  bloquear patrones de ataques conocidos. Úsalo como
                  <em> capa extra</em>, nunca como única defensa.
                </p>
              ),
            },
            {
              id: 'scan',
              title: 'Auditorías y análisis estático',
              content: (
                <p>
                  Herramientas como <em>SQLMap</em> (en entornos de
                  prueba), <em>SonarQube</em>, <em>Snyk</em> o
                  <em> Semgrep</em> pueden detectar consultas
                  vulnerables antes de que lleguen a producción.
                </p>
              ),
            },
          ]}
        />
      </section>

      <section className="block">
        <h3>✅ Checklist interactivo</h3>
        <p>
          Marca las prácticas que ya aplicas en tus proyectos. La barra
          muestra tu progreso.
        </p>

        <div
          className="progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-label">
          {done} de {total} completadas · {progress}%
        </p>

        <ul className="checklist">
          {checklistInicial.map((c) => (
            <li key={c.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={() => toggle(c.id)}
                />
                <span className={checked[c.id] ? 'check-done' : ''}>
                  {c.label}
                </span>
              </label>
            </li>
          ))}
        </ul>

        {done === total && (
          <div className="callout callout--success">
            <Icon name="check" size={18} /> ¡Excelente! Estás aplicando
            las prácticas clave para mantener tu app libre de SQLi.
          </div>
        )}
      </section>

      <section className="block block-cta">
        <div>
          <h3>Listo para cerrar la wiki</h3>
          <p>
            Repasamos qué es, cómo funciona, los riesgos y la
            prevención. Ve a la conclusión.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate?.('conclusion')}
        >
          Conclusión <Icon name="check" size={16} />
        </button>
      </section>
    </article>
  )
}
