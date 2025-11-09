import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Portafolios() {
  const navigate = useNavigate();

  const [portafolios] = useState([
    {
      id: 1,
      nombre: "Portafolio Principal",
      valor: 1250000,
      rendimiento: 5.8,
      instrumentos: 3,
    },
    {
      id: 2,
      nombre: "Inversión Tech",
      valor: 870000,
      rendimiento: 3.2,
      instrumentos: 2,
    },
  ]);

  return (
    <div style={pageStyle}>
      {/* Encabezado con título y botón lateral */}
      <div style={headerRow}>
        <div>
          <h2 style={titleStyle}>Mis Portafolios</h2>
          <p style={subtitleStyle}>
            Visualiza y gestiona tus portafolios de inversión simulados.
          </p>
        </div>
        <button style={btnAdd} onClick={() => navigate("/crear-portafolio")}>
          ➕ Crear Portafolio
        </button>
      </div>

      {/* Grid de portafolios */}
      <section style={gridStyle}>
        {portafolios.map((p) => (
          <div key={p.id} style={cardStyle}>
            <h3 style={cardTitle}>{p.nombre}</h3>
            <p>
              <strong>Valor total:</strong> ${p.valor.toLocaleString()}
            </p>
            <p>
              <strong>Rendimiento:</strong> {p.rendimiento}%
            </p>
            <p>
              <strong>Instrumentos:</strong> {p.instrumentos}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

/* 🎨 Estilos */
const pageStyle = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
};

const titleStyle = {
  color: "var(--uis-green)",
  marginBottom: "5px",
};

const subtitleStyle = {
  color: "#64748b",
  margin: 0,
};

const btnAdd = {
  backgroundColor: "var(--uis-green-light)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: "0.95rem",
  transition: "background-color 0.2s ease",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0",
};

const cardTitle = {
  color: "var(--uis-green-light)",
  marginBottom: "10px",
};
