export default function Aprendizaje() {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>📚 Aprendizaje</h2>
        <p style={subtitleStyle}>
          Mejora tus conocimientos financieros y estrategias de inversión.
        </p>
      </header>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Cursos y Recursos</h3>
          <p>Accede a materiales educativos para aprender a invertir mejor.</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Simuladores</h3>
          <p>
            Practica estrategias de inversión sin riesgo en modo de simulación.
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
const headerStyle = { marginBottom: "20px" };
const titleStyle = { color: "var(--uis-green)", marginBottom: "5px" };
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
const cardTitle = { color: "var(--uis-green)", marginBottom: "10px" };
