import { useState, useEffect } from "react";

export default function InicioDark() {
  const [expandedCards, setExpandedCards] = useState({});
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsFloatingExpanded((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cardsData = [
    { id: "portafolios", title: "Portafolios", desc: "Visualiza y gestiona tus portafolios simulados.", details: "Aquí puedes crear múltiples portafolios, ver su rendimiento y balance, y analizar su composición con gráficas interactivas y métricas clave." },
    { id: "transacciones", title: "Transacciones", desc: "Revisa tus compras y ventas recientes.", details: "Consulta todas las operaciones simuladas realizadas, con detalles de fecha, instrumento y cantidad, incluyendo filtros avanzados por tipo de inversión." },
    { id: "precios", title: "Precios", desc: "Consulta precios actuales y históricos.", details: "Visualiza los precios de acciones, ETFs y otros instrumentos en tiempo real y con historial completo, permitiendo análisis de tendencias y comparaciones históricas." },
    { id: "rendimiento", title: "Rendimiento", desc: "Analiza el desempeño de tus inversiones.", details: "Gráficos y estadísticas de rendimiento de cada portafolio y de los instrumentos individuales, destacando ganancias, pérdidas y volatilidad." },
    { id: "ahorro", title: "Ahorro", desc: "Simula cuentas de ahorro y su crecimiento.", details: "Puedes probar diferentes tasas de interés y ver cómo se acumula tu capital con intereses compuestos en escenarios personalizados." },
    { id: "aprendizaje", title: "Aprendizaje", desc: "Contenido educativo sobre finanzas.", details: "Guías y explicaciones sobre conceptos financieros, riesgos, rendimientos y diversificación para mejorar tu educación financiera." },
    { id: "perfil", title: "Perfil", desc: "Gestiona tu información personal.", details: "Modifica nombre, correo, y cambia tu imagen de perfil para personalizar tu experiencia en la plataforma de manera segura." },
  ];

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Inicio</h2>
        <p style={subtitleStyle}>Bienvenido al panel principal de transacciones.</p>
      </header>

      <section style={gridStyle}>
        {cardsData.map((card) => {
          const isExpanded = expandedCards[card.id] || false;
          return (
            <div
              key={card.id}
              style={{
                ...cardStyle,
                cursor: "pointer",
                backgroundColor: isExpanded ? "#374151" : "#1f2937",
                position: "relative",
              }}
              onClick={() => toggleCard(card.id)}
            >
              <h3 style={cardTitle}>{card.title}</h3>
              <p style={{ color: "#d1d5db" }}>{card.desc}</p>
              <div
                style={{
                  maxHeight: isExpanded ? "300px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease, padding 0.5s ease",
                  padding: isExpanded ? "10px 0 0 0" : "0",
                }}
              >
                <p style={{ color: "#d1d5db" }}>{card.details}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Tarjeta flotante */}
      <div
        style={{
          ...floatingCardStyle,
          bottom: "10px",
          left: "260px",
          backgroundColor: isFloatingExpanded ? "#374151" : "#1f2937",
        }}
        onClick={() => setIsFloatingExpanded((prev) => !prev)}
      >
        <h3 style={cardTitle}>Sobre la Plataforma</h3>
        <div
          style={{
            maxHeight: isFloatingExpanded ? "500px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.5s ease, padding 0.5s ease",
            padding: isFloatingExpanded ? "10px 0 0 0" : "0",
          }}
        >
          <p style={{ color: "#d1d5db" }}>
            Esta plataforma permite a los usuarios simular inversiones en acciones, ETFs y cuentas de ahorro, creando portafolios ficticios para aprender sobre los mercados financieros sin riesgo real.
          </p>
          <p style={{ color: "#d1d5db" }}>
            <strong>Objetivos:</strong> ofrecer educación financiera, gestión de portafolios simulados, datos realistas y análisis de rendimiento.
          </p>
          <p style={{ color: "#d1d5db" }}>
            <strong>Funcionalidades principales:</strong> registro de usuario, simulación de inversiones, creación de portafolios, gráficos y análisis de rendimiento, contenido educativo, y simulación de escenarios de mercado.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "10px" }}>
            Presiona la barra espaciadora para expandir/contraer rápidamente esta tarjeta.
          </p>
        </div>
      </div>
    </div>
  );
}



const pageStyle = {
  backgroundColor: "#111827",
  minHeight: "100vh",
  padding: "30px",
  position: "static",
};

const headerStyle = {
  marginBottom: "20px",
};

const titleStyle = {
  color: "#4ade80",
  marginBottom: "5px",
};

const subtitleStyle = {
  color: "#d1d5db",
  margin: 0,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  border: "1px solid #e3e3e3ff",
  transition: "all 0.3s ease",
  position: "relative",
  alignSelf: "start",
};

const floatingCardStyle = {
  position: "fixed",
  width: "350px",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  border: "1px solid #ffffffff",
  color: "#d1d5db",
  cursor: "pointer",
  transition: "all 0.3s ease",
  zIndex: 1000,
};

const cardTitle = {
  color: "#4ade80",
  marginBottom: "10px",
};
