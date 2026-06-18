import Card from '../components/Card.jsx'
import Icon from '../components/Icons.jsx'

/**
 * Página "Riesgos".
 * Lista lo que un atacante puede hacer si la app es vulnerable.
 */
export default function Riesgos({ onNavigate }) {
  return (
    <article className="page">
      <header className="page-header">
        <h2>Riesgos de una Inyección SQL</h2>
        <p className="page-lead">
          Si una app es vulnerable, las consecuencias pueden ir desde
          una simple filtración de datos hasta el control total del
          servidor.
        </p>
      </header>

      <section className="grid-cards grid-cards--2">
        <Card
          tone="danger"
          icon={<Icon name="bug" size={20} />}
          title="Robo de datos"
          subtitle="Confidencialidad"
        >
          <p>
            Un atacante puede extraer <strong>tablas enteras</strong>:
            usuarios, contraseñas (hasheadas o no), correos, datos
            personales, tarjetas, historiales clínicos, etc.
          </p>
        </Card>

        <Card
          tone="danger"
          icon={<Icon name="key" size={20} />}
          title="Acceso no autorizado"
          subtitle="Autenticación rota"
        >
          <p>
            Con <code>' OR '1'='1</code> u otros trucos, el atacante
            puede iniciar sesión <strong>como cualquier usuario</strong>,
            incluido el administrador.
          </p>
        </Card>

        <Card
          tone="warning"
          icon={<Icon name="warning" size={20} />}
          title="Modificación o borrado"
          subtitle="Integridad"
        >
          <p>
            Con <code>UPDATE</code> o <code>DELETE</code> inyectados,
            podrían cambiar precios, vaciar tablas o destruir
            información crítica.
          </p>
        </Card>

        <Card
          tone="warning"
          icon={<Icon name="rocket" size={20} />}
          title="Escalada al servidor"
          subtitle="Riesgo mayor"
        >
          <p>
            En motores con permisos elevados, SQLi puede permitir
            <strong> ejecutar comandos en el sistema operativo</strong>
            {' '}del servidor y tomar el control total.
          </p>
        </Card>

        <Card
          tone="info"
          icon={<Icon name="database" size={20} />}
          title="Caída del servicio"
          subtitle="Disponibilidad"
        >
          <p>
            Un <code>DROP TABLE</code> o una query muy pesada puede
            tirar la base de datos y dejar la app fuera de línea.
          </p>
        </Card>

        <Card
          tone="info"
          icon={<Icon name="shield" size={20} />}
          title="Multas y daño reputacional"
          subtitle="Impacto legal"
        >
          <p>
            Una filtración de datos de usuarios puede implicar
            sanciones legales (RGPD, leyes locales) y una pérdida de
            confianza enorme.
          </p>
        </Card>
      </section>

      <section className="block">
        <h3>🎯 ¿A quién atacan con esto?</h3>
        <p>
          A cualquiera. Históricamente, este tipo de漏洞 ha afectado a
          gobiernos, bancos, hospitales, universidades, e-commerce,
          redes sociales y juegos online. El motivo es simple: un solo
          descuido en una sola consulta basta para comprometer todo
          un sistema.
        </p>
      </section>

      <section className="block block-cta">
        <div>
          <h3>La buena noticia: se puede prevenir casi al 100%</h3>
          <p>
            Con buenas prácticas modernas, la inyección SQL es una
            vulnerabilidad totalmente evitable.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate?.('prevencion')}
        >
          Ir a Prevención <Icon name="shield" size={16} />
        </button>
      </section>
    </article>
  )
}
