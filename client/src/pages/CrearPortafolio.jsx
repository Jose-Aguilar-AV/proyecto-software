import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearPortafolio() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !monto.trim()) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    console.log("Nuevo portafolio creado:", { nombre, monto, descripcion });

    navigate("/portafolios");
  };

  return (
    <div style={pageStyle}>
      <header style={headerRow}>
        <h2 style={titleStyle}>Crear Portafolio</h2>
        <button style={btnBack} onClick={() => navigate("/portafolios")}>
          Volver
        </button>
      </header>

      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>Nombre del portafolio</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
          placeholder="Ejemplo: Ahorro largo plazo"
          required
        />

        <label style={labelStyle}>Monto inicial (COP)</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          style={inputStyle}
          placeholder="1000000"
          required
        />

        <label style={labelStyle}>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={textAreaStyle}
          placeholder="Describe el objetivo de este portafolio..."
        />

        <button type="submit" style={btnCreate}>
          Guardar Portafolio
        </button>
      </form>
    </div>
  );
}

/* Estilos */
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

const btnBack = {
  backgroundColor: "var(--uis-green-light)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
};

const formStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "25px",
  boxShadow: "0 2px 8px rgba(145, 145, 145, 0.05)",
  border: "1px solid #e2e8f0",
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const labelStyle = {
  fontWeight: 500,
  color: "#334155",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
};

const textAreaStyle = {
  ...inputStyle,
  resize: "none",
  height: "100px",
};

const btnCreate = {
  backgroundColor: "var(--uis-green-light)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "10px 16px",
  fontWeight: 500,
  cursor: "pointer",
  marginTop: "10px",
};
