import React, { useState } from "react";

export default function Aprendizaje() {
  const learningCards = [
    {
      id: "finanzas-basicas",
      title: "Finanzas Básicas",
      desc: "Conceptos esenciales para comenzar en el mundo financiero.",
      details:
        "Aprende sobre activos, pasivos, ingresos, gastos y patrimonio. Entiende cómo funciona el interés simple y compuesto, la inflación, el ahorro y la importancia del presupuesto personal.",
      video: "https://www.youtube.com/embed/X38MGyuc0ds", // de turn0search16
      pdf: "https://arxiv.org/pdf/2109.03977.pdf"

    },
    {
      id: "mercado-valores",
      title: "Mercado de Valores",
      desc: "Entiende cómo funcionan las acciones, ETFs y otros instrumentos.",
      details:
        "Conceptos como liquidez, capitalización bursátil, volatilidad, oferta y demanda, índices bursátiles y tipos de instrumentos (acciones ordinarias, preferenciales, bonos, ETFs, fondos mutuos).",
      video: "https://www.youtube.com/embed/OCBda6oX6gA", // de turn0search8
      pdf: "https://arxiv.org/pdf/1901.10771.pdf"

    },
    {
      id: "simuladores",
      title: "Simuladores",
      desc: "Practica inversiones sin arriesgar dinero real.",
      details:
        "Prueba estrategias de compra, venta y rebalanceo. Observa ganancias/pérdidas simuladas y evalúa escenarios basados en datos históricos.",
      video: "https://www.youtube.com/embed/B2MD0RBoTj0",
      pdf: "https://arxiv.org/pdf/2107.00001.pdf"
    },
    {
      id: "gestion-riesgo",
      title: "Gestión del Riesgo",
      desc: "Aprende a proteger tus inversiones.",
      details:
        "Diversificación, relación riesgo-retorno, stop-loss, beta, drawdown y cómo dimensionar la posición según tu perfil.",
      video: "https://www.youtube.com/embed/cC0KxNeLp1E",
      pdf: "https://arxiv.org/pdf/2112.02284.pdf"
    },
    {
      id: "analisis-fundamental",
      title: "Análisis Fundamental",
      desc: "Analiza empresas a partir de sus datos financieros.",
      details:
        "Interpretación de estados financieros, razones (PER, ROE), flujo de caja, ventajas competitivas y valoración.",
      video: "https://www.youtube.com/embed/2XH1PV4a7x0",
      pdf: "https://arxiv.org/pdf/2107.00001.pdf"
    },
    {
      id: "analisis-tecnico",
      title: "Análisis Técnico",
      desc: "Estudia patrones en gráficos de precio.",
      details:
        "Tendencias, soportes y resistencias, medias móviles, RSI, MACD, velas japonesas y volumen.",
      video: "https://www.youtube.com/embed/iW-yt5qgG7Q",
      pdf: "https://arxiv.org/pdf/2101.08396.pdf"
    },
    {
      id: "psicologia",
      title: "Psicología del Inversor",
      desc: "Controla tus emociones al invertir.",
      details:
        "Sesgos cognitivos (FOMO, aversión a la pérdida), disciplina, reglas de entrada/salida y manejo del riesgo emocional.",
      video: "https://www.youtube.com/embed/4Lx7mVgC9O4",
      pdf: "https://arxiv.org/pdf/2205.02036.pdf"
    }
  ];

  const [expanded, setExpanded] = useState({});

  const toggleCard = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Aprendizaje</h2>
        <p style={subtitleStyle}>
          Mejora tus conocimientos financieros y desarrolla habilidades clave
          para invertir correctamente.
        </p>
      </header>

      <section style={gridStyle}>
        {learningCards.map((card) => {
          const isExpanded = expanded[card.id] || false;

          return (
            <article
              key={card.id}
              style={{
                ...cardStyle,
                backgroundColor: isExpanded ? "#f0fdf4" : "white",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => toggleCard(card.id)}
              aria-expanded={isExpanded}
            >
              <h3 style={cardTitle}>{card.title}</h3>
              <p style={{ margin: 0 }}>{card.desc}</p>

              {/* CONTENIDO EXPANDIDO */}
              <div
                style={{
                  maxHeight: isExpanded ? "900px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.45s ease, padding 0.35s ease",
                  paddingTop: isExpanded ? "12px" : "0"
                }}
              >
                <p style={{ margin: 0, color: "#334155" }}>{card.details}</p>

                {/* Recomendaciones */}
                <ul
                  style={{
                    marginTop: "10px",
                    paddingLeft: "18px",
                    color: "#475569"
                  }}
                >
                  <li>Lectura recomendada sobre {card.title}</li>
                  <li>Vídeo breve introductorio</li>
                  <li>Ejercicio práctico</li>
                </ul>

                {/* VIDEO ONLINE */}
                <div style={{ marginTop: "15px" }}>
                  <iframe
                    width="100%"
                    height="315"
                    src={card.video}
                    title="Video educativo"
                    style={{
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* PDF ONLINE */}
                <div style={{ marginTop: "20px" }}>
                  <iframe
                    src={card.pdf}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1"
                    }}
                    title="PDF"
                  ></iframe>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

const pageStyle = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  padding: "30px"
};

const headerStyle = {
  marginBottom: "20px"
};

const titleStyle = {
  color: "var(--uis-green)",
  marginBottom: "5px"
};

const subtitleStyle = {
  color: "#64748b",
  margin: 0
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0",
  position: "relative",
  alignSelf: "start"
};

const cardTitle = {
  color: "var(--uis-green)",
  marginBottom: "10px"
};
