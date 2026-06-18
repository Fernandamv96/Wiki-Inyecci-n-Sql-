import Accordion from '../components/Accordion.jsx'
import Icon from '../components/Icons.jsx'

/**
 * Página "¿Qué es la Inyección SQL?"
 * - Definición clara
 * - Analogía fácil (la del restaurante)
 */
export default function QueEs({ onNavigate }) {
  return (
    <article className="page">
      <header className="page-header">
        <h2>¿Qué es la Inyección SQL?</h2>
        <p className="page-lead">
          Es un tipo de ataque a aplicaciones web en el que un atacante
          introduce código SQL dentro de un campo de texto para manipular
          la base de datos.
        </p>
      </header>

      <section className="block">
        <h3>🧠 Definición simple</h3>
        <p>
          Una aplicación web normalmente pide datos al usuario (un nombre,
          un email, una contraseña) y los usa dentro de una <strong>
          consulta SQL</strong> para buscar, guardar o borrar información.
        </p>
        <p>
          Si el programador <em>concatena</em> lo que escribió el usuario
          dentro de la consulta sin ningún filtro, el usuario puede
          "colarse" dentro de la instrucción y cambiarla a su favor.
        </p>
        <p>
          A eso se le llama <strong>inyección SQL</strong> (o <em>SQL
          Injection</em>, <em>SQLi</em>).
        </p>
      </section>

      <section className="block block-analogy">
        <h3>🍔 La analogía del restaurante</h3>
        <div className="analogy-grid">
          <div className="analogy-col">
            <div className="analogy-tag">Sin inyección</div>
            <p>
              Imagina un restaurante donde el mesero <strong>anota tu
              pedido en una hoja</strong> y la lleva a la cocina tal cual.
              El cocinero lee "quiero una hamburguesa" y te la prepara.
            </p>
            <p>✅ Si el pedido tiene sentido, todo sale bien.</p>
          </div>
          <div className="analogy-col">
            <div className="analogy-tag analogy-tag--bad">Con inyección</div>
            <p>
              Pero si un cliente escribe: <em>"quiero una hamburguesa,
              ignora el menú y dame TODO lo que haya"</em>, y el mesero
              lo pasa tal cual a la cocina... el cocinero se confunde.
            </p>
            <p>
              ⚠️ La orden se rompe y el cliente recibe más de lo que
              debería. Eso es básicamente una inyección SQL: <strong>
              "engañar al sistema para que haga algo distinto al
              previsto"</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="block">
        <h3>📌 En una frase</h3>
        <blockquote className="quote">
          "Una inyección SQL ocurre cuando los datos que escribe el
          usuario se interpretan como <strong>código</strong> en lugar
          de como <strong>datos</strong>."
        </blockquote>
      </section>

      <section className="block">
        <h3>❓ Preguntas frecuentes</h3>
        <Accordion
          items={[
            {
              id: 'q1',
              title: '¿Es un ataque nuevo?',
              content: (
                <p>
                  No, es de los más antiguos. Se conoce desde finales de
                  los 90 y sigue apareciendo hoy en sitios mal protegidos.
                </p>
              ),
            },
            {
              id: 'q2',
              title: '¿A quién afecta?',
              content: (
                <p>
                  A cualquier aplicación web que use una base de datos SQL
                  (MySQL, PostgreSQL, SQL Server, SQLite...) y construya
                  consultas concatenando texto del usuario.
                </p>
              ),
            },
            {
              id: 'q3',
              title: '¿Por qué sigue siendo peligroso?',
              content: (
                <p>
                  Porque es fácil de explotar, automatizable y los
                  frameworks modernos (bien usados) lo previenen, pero
                  basta con un descuido en una sola consulta para que
                  toda la app quede expuesta.
                </p>
              ),
            },
            {
              id: 'q4',
              title: '¿Es ilegal aprender sobre esto?',
              content: (
                <p>
                  No. Estudiar cómo funciona es <strong>la mejor manera
                  de prevenirlo</strong>. Lo ilegal es usarlo contra
                  sistemas sin autorización. Esta wiki es 100% educativa.
                </p>
              ),
            },
          ]}
        />
      </section>

      <section className="block block-cta">
        <div>
          <h3>¿Listo para verlo en acción?</h3>
          <p>
            Pasa a la siguiente sección y entenderás el ataque con un
            ejemplo paso a paso.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate?.('comoFunciona')}
        >
          Siguiente: ¿Cómo funciona? <Icon name="play" size={16} />
        </button>
      </section>
    </article>
  )
}
