export default function Precios() {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Precios</h2>
        <p style={subtitleStyle}>
          Consulta los precios actualizados de los activos disponibles.
        </p>
      </header>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Acciones</h3>
          <ul style={listStyle}>
            <li>Ecopetrol: $2,780</li>
            <li>Grupo Aval: $850</li>
            <li>Nutresa: $41,200</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Bonos</h3>
          <ul style={listStyle}>
            <li>Bono TES 2030: $101,200</li>
            <li>Bono TES 2040: $97,800</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>ETF</h3>
          <ul style={listStyle}>
            <li>S&P 500: $4,972</li>
            <li>Nasdaq 100: $18,430</li>
          </ul>
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

const listStyle = {
  margin: 0,
  paddingLeft: "20px",
  color: "#475569",
};
