import SqlSimulator from '../components/SqlSimulator.jsx'
import Card from '../components/Card.jsx'
import Icon from '../components/Icons.jsx'

/**
 * Página "Ejemplo visual".
 * Contiene la simulación interactiva y una explicación paso a paso
 * de lo que está ocurriendo.
 */
export default function EjemploVisual({ onNavigate }) {
  return (
    <article className="page">
      <header className="page-header">
        <h2>Ejemplo visual</h2>
        <p className="page-lead">
          Una mini simulación que muestra cómo un input "se cuela"
          dentro de la consulta SQL. <strong>No se ejecuta nada
          peligroso</strong>, solo construimos strings para entender
          el problema.
        </p>
      </header>

      <section className="block">
        <SqlSimulator />
      </section>

      <section className="block">
        <h3>🪄 ¿Qué está pasando en la simulación?</h3>
        <div className="grid-cards grid-cards--3">
          <Card tone="info" icon={<Icon name="list" size={18} />} title="1. Tipeas algo">
            <p>
              El cuadro de texto es el "formulario de login". Lo que
              escribes llega tal cual al backend.
            </p>
          </Card>
          <Card tone="warning" icon={<Icon name="bug" size={18} />} title="2. Se concatena">
            <p>
              La versión vulnerable mete tu texto dentro de comillas
              simples <code>' '</code> y arma la query con
              concatenación.
            </p>
          </Card>
          <Card tone="success" icon={<Icon name="shield" size={18} />} title="3. Se parametriza">
            <p>
              La versión segura usa un <strong>placeholder</strong>
              (<code>?</code>) y envía tu input por separado, como un
              dato, no como parte de la query.
            </p>
          </Card>
        </div>
      </section>

      <section className="block">
        <h3>🧪 Pruebas sugeridas (educativas)</h3>
        <p>
          Escribe estos ejemplos en la simulación y observa cómo
          cambia la query. Recuerda: no se ejecuta nada, es solo
          texto.
        </p>
        <ul className="list">
          <li>
            <Icon name="dot" size={14} /> <code>maria</code> → entrada
            normal, query inofensiva.
          </li>
          <li>
            <Icon name="dot" size={14} /> <code>' OR '1'='1</code> →
            la simulación marca la query como alterada.
          </li>
          <li>
            <Icon name="dot" size={14} /> <code>admin'; --</code> →
            comentario que anula el resto de la query.
          </li>
          <li>
            <Icon name="dot" size={14} /> <code>x'; DROP TABLE users; --</code> → ejemplo
            clásico en libros de texto (no se ejecuta, solo se ve la
            forma del payload).
          </li>
        </ul>
        <p className="note">
          <Icon name="lock" size={16} /> <strong>Importante:</strong> en
          esta simulación ningún payload se envía a ningún servidor.
          Solo se renderiza una cadena de texto con fines didácticos.
        </p>
      </section>

      <section className="block block-cta">
        <div>
          <h3>¿Y si una app real es vulnerable?</h3>
          <p>
            El siguiente paso es entender qué tan grave puede ser: ve
            a <strong>Riesgos</strong>.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate?.('riesgos')}
        >
          Ver riesgos <Icon name="warning" size={16} />
        </button>
      </section>
    </article>
  )
}
