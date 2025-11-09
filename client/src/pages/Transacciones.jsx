export default function Transacciones() {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Transacciones</h2>
        <p style={subtitleStyle}>
          Visualiza y gestiona todas tus operaciones financieras.
        </p>
      </header>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Historial</h3>
          <p>
            Revisa tus compras, ventas y transferencias recientes con detalle.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Nueva Transacción</h3>
          <p>Realiza operaciones directas con tus instrumentos financieros.</p>
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
const headerStyle = { marginBottom: "20px" };
const titleStyle = { color: "var(--uis-green-light)", marginBottom: "5px" };
const subtitleStyle = { color: "#64748b", margin: 0 };
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
const cardTitle = { color: "var(--uis-green-light)", marginBottom: "10px" };
