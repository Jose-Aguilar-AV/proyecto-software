import Chart from "../components/Chart";

const data = [
  { fecha: "Ene", valor: 1200 },
  { fecha: "Feb", valor: 1400 },
  { fecha: "Mar", valor: 1350 },
  { fecha: "Abr", valor: 1600 },
];

export default function Rendimiento() {
  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>Rendimiento</h2>
      <p style={subtitleStyle}>Visualiza el crecimiento de tus inversiones.</p>
      <div style={cardStyle}>
        <Chart data={data} />
      </div>
    </div>
  );
}

const pageStyle = { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "30px" };
const titleStyle = { color: "var(--uis-green)" };
const subtitleStyle = { color: "#64748b" };
const cardStyle = { background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" };
