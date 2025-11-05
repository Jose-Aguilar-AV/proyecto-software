export default function Inicio() {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>🏠 Inicio</h2>
        <p style={subtitleStyle}>
          Bienvenido al panel principal de transacciones.
        </p>
      </header>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Resumen General</h3>
          <p>
            Aquí podrás ver estadísticas rápidas, indicadores y accesos directos.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Mi Portafolio</h3>
          <p>
            Consulta tus valores actuales, rendimientos y movimientos recientes.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Inversiones Actuales</h3>
          <p>
            Visualiza tus posiciones activas y su desempeño en tiempo real.
          </p>
        </div>
      </section>
    </div>
  );
}

const pageStyle = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};

const headerStyle = {
  marginBottom: "20px",
};

const titleStyle = {
  color: "var(--uis-green)",
  marginBottom: "5px",
};

const subtitleStyle = {
  color: "#64748b",
  margin: 0,
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
  color: "var(--uis-green)",
  marginBottom: "10px",
};
