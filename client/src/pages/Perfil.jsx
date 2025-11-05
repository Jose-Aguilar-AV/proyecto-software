export default function Perfil() {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>👤 Perfil</h2>
        <p style={subtitleStyle}>
          Administra tu información personal y preferencias de usuario.
        </p>
      </header>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Datos Personales</h3>
          <p>Actualiza tu nombre, correo y datos de contacto.</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Seguridad</h3>
          <p>
            Cambia tu contraseña y configura opciones adicionales de acceso.
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
