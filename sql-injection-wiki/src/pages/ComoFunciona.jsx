import { useState } from 'react'
import Icon from '../components/Icons.jsx'

/**
 * Página "¿Cómo funciona?"
 * Explica el ataque paso a paso con un ejemplo conceptual
 * (sin código malicioso real ejecutable).
 */
export default function ComoFunciona({ onNavigate }) {
  // Paso activo (1, 2, 3, 4) para resaltar la explicación
  const [step, setStep] = useState(1)

  const steps = [
    {
      n: 1,
      title: 'El usuario envía datos',
      desc: 'La app muestra un formulario de login: pide usuario y contraseña. Ese texto viaja al backend.',
    },
    {
      n: 2,
      title: 'El backend arma la consulta',
      desc: 'El servidor toma el valor del input y lo "pega" dentro de una query SQL, con concatenación de strings.',
    },
    {
      n: 3,
      title: 'El atacante manipula el input',
      desc: 'En lugar de un nombre normal, escribe caracteres especiales (comillas, palabras clave SQL) que cambian el significado de la consulta.',
    },
    {
      n: 4,
      title: 'La base de datos obedece la nueva orden',
      desc: 'La base de datos ejecuta la query alterada: devuelve otros datos, los borra o da acceso sin contraseña.',
    },
  ]

  return (
    <article className="page">
      <header className="page-header">
        <h2>¿Cómo funciona?</h2>
        <p className="page-lead">
          Un ataque de SQL Injection se explica mejor en pasos. Haz clic
          en cada paso para verlo.
        </p>
      </header>

      <section className="block">
        <ol className="stepper">
          {steps.map((s) => (
            <li
              key={s.n}
              className={`step ${step === s.n ? 'step--active' : ''}`}
              onClick={() => setStep(s.n)}
            >
              <div className="step-num">{s.n}</div>
              <div>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="block">
        <h3>🧪 Ejemplo conceptual (educativo)</h3>
        <p>
          Supongamos un login. La idea es entender <em>cómo se
          construye</em> la consulta, no aprender a explotarla. La
          cadena de texto entre corchetes <code>[ ]</code> es lo que
          escribió el usuario.
        </p>

        <div className="code-compare">
          <div className="code-block">
            <div className="code-tag code-tag--good">Entrada normal</div>
            <pre>
{`// Input del usuario:
usuario = "maria"
contrasena = "1234"

// Query construida en el backend (vulnerable):
SELECT * FROM users
WHERE username = 'maria' AND password = '1234';

// La base de datos busca ese usuario y compara la contraseña.
`}
            </pre>
          </div>

          <div className="code-block">
            <div className="code-tag code-tag--bad">Entrada manipulada</div>
            <pre>
{`// Input del usuario (esto es lo que viaja al backend):
usuario = "admin' OR '1'='1"
contrasena = "cualquiera"

// Query construida en el backend (vulnerable):
SELECT * FROM users
WHERE username = 'admin' OR '1'='1'
  AND password = 'cualquiera';

// Como la condición '1'='1' es SIEMPRE verdadera,
// la base de datos devuelve registros sin validar la contraseña.
`}
            </pre>
          </div>
        </div>

        <p className="note">
          <Icon name="warning" size={16} /> <strong>Nota:</strong> El
          ejemplo es solo para entender la <em>forma</em> del ataque. En
          una app real, las contraseñas nunca deben guardarse en texto
          plano y se deben usar <em>prepared statements</em> (lo vemos
          en Prevención).
        </p>
      </section>

      <section className="block">
        <h3>🔎 ¿Por qué funciona?</h3>
        <ul className="list">
          <li>
            <Icon name="dot" size={14} /> El programador <strong>confió en
            que el input siempre sería un dato</strong>, nunca código.
          </li>
          <li>
            <Icon name="dot" size={14} /> La base de datos, al recibir
            texto, <strong>lo interpreta como parte de la query</strong>.
          </li>
          <li>
            <Icon name="dot" size={14} /> Sin filtros ni separación entre
            código y datos, la consulta se reescribe a sí misma.
          </li>
        </ul>
      </section>

      <section className="block block-cta">
        <div>
          <h3>¿Quieres probarlo sin riesgo?</h3>
          <p>
            Tienes una simulación segura en la siguiente página: solo
            construye strings, no toca ninguna base de datos.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate?.('ejemplo')}
        >
          Ver simulación <Icon name="play" size={16} />
        </button>
      </section>
    </article>
  )
}
