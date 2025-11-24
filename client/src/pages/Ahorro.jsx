import { useState, useEffect } from "react";

export default function Ahorro() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Generar un saldo aleatorio simulando ganancia o pérdida de acciones
    // Entre 5000 y 10000, con posibilidad de caída (pérdida)
    const randomBalance = (Math.random() * 5000 + 5000) * (Math.random() > 0.3 ? 1 : 0.85);
    setBalance(randomBalance);
  }, []);

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Ahorro</h2>
        <p style={subtitleStyle}>
          Administra tus cuentas y estrategias de ahorro eficientemente.
        </p>
        <p style={{ fontWeight: 600, marginTop: 6 }}>Saldo disponible: $1400</p>
      </header>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Cuentas de Ahorro</h3>
          <p>Consulta tus saldos y movimientos más recientes.</p>
          <p style={{ marginTop: 10, color: "#64748b" }}>
            monto peligroso: $1,000
          </p>
          <div style={{ marginTop: 10 }}>
            <div style={progressBarBackground}>
              <div
                style={{
                  ...progressBarFill,
                  width: `${Math.min(10, (balance / 10000) * 100)}%`,
                  backgroundColor: balance < 6000 ? "#ef4444" : "#22c55e", // rojo si pérdida
                }}
              />
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Metas Financieras</h3>
          <p>Define tus objetivos de ahorro y haz seguimiento a su progreso.</p>
          <p style={{ marginTop: 10, color: "#64748b" }}>
            Meta sugerida: $12,000
          </p>
          <div style={{ marginTop: 10 }}>
            <div style={progressBarBackground}>
              <div
                style={{
                  ...progressBarFill,
                  width: `${Math.min(100, (balance / 12000) * 100)}%`,
                  backgroundColor: "#3b82f6",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================
   Estilos
========================= */
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

// Barra de progreso
const progressBarBackground = {
  width: "100%",
  height: 12,
  borderRadius: 6,
  background: "#e2e8f0",
  overflow: "hidden",
};
const progressBarFill = {
  height: "100%",
  borderRadius: 6,
  transition: "width 0.5s ease",
};
