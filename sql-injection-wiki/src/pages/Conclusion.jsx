import Icon from '../components/Icons.jsx'

/**
 * Página "Conclusión".
 * Resumen final con texto listo para exposición.
 */
export default function Conclusion({ onNavigate }) {
  return (
    <article className="page">
      <header className="page-header">
        <h2>Conclusión</h2>
        <p className="page-lead">
          Lo importante que te llevas de esta wiki.
        </p>
      </header>

      <section className="block">
        <h3>🧾 Resumen en 5 puntos</h3>
        <ol className="numbered">
          <li>
            La <strong>inyección SQL</strong> ocurre cuando un input
            del usuario se concatena dentro de una consulta SQL sin
            ningún tipo de separación entre código y datos.
          </li>
          <li>
            Es una vulnerabilidad <strong>vieja pero vigente</strong>:
            todavía aparece en aplicaciones reales y suele ser
            crítica.
          </li>
          <li>
            Sus consecuencias van desde <strong>robo de datos</strong>
            {' '}hasta la <strong>toma de control del servidor</strong>.
          </li>
          <li>
            La defensa principal son los <strong>prepared
            statements</strong>: separar la query de los datos.
          </li>
          <li>
            Un <strong>ORM</strong>, <strong>validación</strong> de
            entradas, <strong>menor privilegio</strong> y buenas
            prácticas de errores completan la protección.
          </li>
        </ol>
      </section>

      <section className="block">
        <h3>🎤 Texto listo para tu exposición</h3>
        <div className="speech">
          <p>
            <em>
              "La inyección SQL es uno de los ataques más antiguos y
              peligrosos de la web. Funciona porque muchos
              programadores, sin darse cuenta, mezclan lo que escribe
              el usuario con las instrucciones que se envían a la
              base de datos. Cuando eso pasa, un atacante puede
              robar contraseñas, ver datos privados e incluso
              controlar el servidor. La buena noticia es que se
              previene casi al 100% usando consultas parametrizadas,
              ORM, validando entradas y aplicando el principio de
              menor privilegio. Aprender sobre esto no es hackear:
              es entender cómo piensa un atacante para defender
              mejor nuestras aplicaciones."
            </em>
          </p>
        </div>
      </section>

      <section className="block">
        <h3>🌐 La ciberseguridad empieza por la educación</h3>
        <p>
          Proyectos como este buscan cerrar la brecha de
          conocimiento. Si más gente entiende <em>por qué</em> ocurren
          los ataques, más productos seguros se construirán.
        </p>
        <ul className="list">
          <li>
            <Icon name="dot" size={14} /> Comparte lo aprendido (sin
            payloads reales).
          </li>
          <li>
            <Icon name="dot" size={14} /> Practica en labs legales
            (HackTheBox, TryHackMe, DVWA, PortSwigger Web Security
            Academy).
          </li>
          <li>
            <Icon name="dot" size={14} /> Nunca pruebes estos ataques
            en sistemas sin autorización.
          </li>
        </ul>
      </section>

      <section className="block block-cta">
        <div>
          <h3>¡Gracias por leer!</h3>
          <p>Vuelve al inicio si quieres repasar otra sección.</p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => onNavigate?.('inicio')}
        >
          Volver al inicio <Icon name="home" size={16} />
        </button>
      </section>
    </article>
  )
}
