import Card from '../components/Card.jsx'
import Icon from '../components/Icons.jsx'

/**
 * Página de Inicio.
 * Es la "portada" de la wiki: una introducción amigable con
 * tarjetas que enlazan a las secciones principales.
 */
export default function Inicio({ onNavigate }) {
  return (
    <div className="page page-inicio">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">
            <Icon name="shield" size={14} /> Wiki educativa
          </span>
          <h2 className="hero-title">
            Inyección SQL: <span className="grad">aprende a defenderte</span>
          </h2>
          <p className="hero-subtitle">
            Una guía clara, visual y 100% educativa sobre una de las
            vulnerabilidades web más conocidas. Aprende qué es, cómo
            funciona y, sobre todo, <strong>cómo prevenirla</strong>.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('queEs')}
            >
              Empezar <Icon name="play" size={16} />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => onNavigate('prevencion')}
            >
              Ir a prevención <Icon name="shield" size={16} />
            </button>
          </div>
        </div>

        {/* Ilustración sugerida (SVG inline, sin assets externos) */}
        <div className="hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#10b981" stopOpacity=".35" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity=".35" />
              </linearGradient>
              <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#34d399" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <rect x="20" y="40" width="360" height="220" rx="20" fill="url(#g1)" />
            <rect x="50" y="80" width="200" height="28" rx="6" fill="#0f172a" stroke="url(#g2)" />
            <rect x="50" y="120" width="280" height="14" rx="4" fill="#1e293b" />
            <rect x="50" y="144" width="240" height="14" rx="4" fill="#1e293b" />
            <rect x="50" y="168" width="180" height="14" rx="4" fill="#1e293b" />
            <circle cx="340" cy="220" r="40" fill="url(#g2)" opacity=".9" />
            <text x="340" y="226" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="800" fontSize="20" fill="#0f172a">SQL</text>
            <path d="M300 200 L340 180 L340 260 Z" fill="#0f172a" opacity=".4" />
          </svg>
        </div>
      </section>

      <section className="grid-cards">
        <Card
          title="¿Qué es?"
          subtitle="Definición simple"
          tone="info"
          icon={<Icon name="help" size={20} />}
          onClick={() => onNavigate('queEs')}
        >
          Una analogía para entender el ataque sin tecnicismos.
        </Card>

        <Card
          title="¿Cómo funciona?"
          subtitle="Paso a paso"
          tone="default"
          icon={<Icon name="flow" size={20} />}
          onClick={() => onNavigate('comoFunciona')}
        >
          Cómo un input malicioso puede alterar una consulta.
        </Card>

        <Card
          title="Ejemplo visual"
          subtitle="Simulación segura"
          tone="success"
          icon={<Icon name="play" size={20} />}
          onClick={() => onNavigate('ejemplo')}
        >
          Una demo interactiva que no ejecuta nada peligroso.
        </Card>

        <Card
          title="Riesgos"
          subtitle="¿Por qué importa?"
          tone="danger"
          icon={<Icon name="warning" size={20} />}
          onClick={() => onNavigate('riesgos')}
        >
          Robo de datos, accesos no autorizados y más.
        </Card>

        <Card
          title="Prevención"
          subtitle="Buenas prácticas"
          tone="success"
          icon={<Icon name="shield" size={20} />}
          onClick={() => onNavigate('prevencion')}
        >
          Prepared statements, ORM, validación y checklist.
        </Card>

        <Card
          title="Conclusión"
          subtitle="Para tu exposición"
          tone="info"
          icon={<Icon name="rocket" size={20} />}
          onClick={() => onNavigate('conclusion')}
        >
          Resumen listo para presentar en clase.
        </Card>
      </section>
    </div>
  )
}
