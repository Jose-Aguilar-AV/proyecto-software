import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../api/api";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default function Rendimiento() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState({ open: false, symbol: null });
  const symbols = ["AAPL", "AMZN", "AMD", "NVDA"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          symbols.map(async (sym) => {
            const res = await api.get(`/historial?symbol=${sym}`);
            const prices = res.data || [];
            const purchasePrice = prices.length ? prices[0].c : 0;
            const lastPrice = prices.length ? prices[prices.length - 1].c : 0;
            const change = lastPrice - purchasePrice;
            const percent = purchasePrice ? (change / purchasePrice) * 100 : 0;
            return { symbol: sym, lastPrice, purchasePrice, change, percent, history: prices, animatedPercent: 0 };
          })
        );
        setData(results);

        // Animar las barras de progreso
        results.forEach((d, index) => {
          let start = 0;
          const end = d.percent;
          const step = end / 50; // 50 frames
          const interval = setInterval(() => {
            start += step;
            setData((prev) => {
              const copy = [...prev];
              copy[index] = { ...copy[index], animatedPercent: Math.abs(Math.min(start, Math.abs(end))) };
              return copy;
            });
            if (Math.abs(start) >= Math.abs(end)) clearInterval(interval);
          }, 12); // ~600ms total
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderSparkline = (prices, symbol) => {
    if (!prices || prices.length === 0)
      return <div style={{ height: 56, color: "#94a3b8" }}>Sin datos</div>;

    const chartData = {
      labels: prices.map((d) => d.t),
      datasets: [
        {
          data: prices.map((d) => d.c),
          borderColor: symbol === "NVDA" ? "#f87171" : "#22c55e",
          backgroundColor: symbol === "NVDA" ? "rgba(248,113,113,0.1)" : "rgba(34,197,94,0.06)",
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
    };

    return <Line data={chartData} options={options} style={{ height: 56 }} />;
  };

  const renderProgressBar = (symbol, percent) => {
    const isPositive = percent >= 0;
    const barColor = symbol === "NVDA" ? "#f87171" : isPositive ? "#22c55e" : "#f87171";
    return (
      <div style={{ width: "100%", background: "#e5e7eb", borderRadius: 6, height: 10, marginTop: 6 }}>
        <div
          style={{
            width: `${Math.min(Math.abs(percent), 100)}%`,
            background: barColor,
            height: "100%",
            borderRadius: 6,
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>
    );
  };

  const FullscreenModal = ({ symbol, prices, onClose }) => {
    const chartData = {
      labels: prices.map((d) => new Date(d.t).toLocaleDateString()),
      datasets: [
        { label: "Cierre", data: prices.map((d) => d.c), borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.1)", tension: 0.3 },
        { label: "Apertura", data: prices.map((d) => d.o), borderColor: "#3b82f6", backgroundColor: "rgba(59,130,246,0.08)", tension: 0.3 },
      ],
    };

    return (
      <div style={modalOverlay} onClick={onClose}>
        <div style={modalCard} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0, color: "var(--uis-green)" }}>{symbol} — Gráfica completa</h3>
            <button style={modalClose} onClick={onClose}>Cerrar</button>
          </div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" }, title: { display: true, text: `Rendimiento histórico — ${symbol}` } },
              scales: { x: { title: { display: true, text: "Fecha" } }, y: { title: { display: true, text: "Precio (USD)" } } },
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Rendimiento de Activos</h2>
        <p style={subtitleStyle}>
          Visualiza el progreso y rendimiento de tus inversiones con gráficas históricas y barra de progreso.
        </p>
      </header>

      {loading && <p style={{ color: "#64748b" }}>Cargando datos...</p>}

      <section style={gridStyle}>
        {data.map((d) => {
          const isLoss = d.symbol === "NVDA" && d.change < 0;
          return (
            <div key={d.symbol} style={cardStyle}>
              <h3 style={cardTitle}>{d.symbol}</h3>
              <p style={{ marginBottom: "4px" }}>
                Compra: ${d.purchasePrice.toFixed(2)} — Actual: ${d.lastPrice.toFixed(2)}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {renderProgressBar(d.symbol, d.animatedPercent)}
                <span style={{ marginLeft: 8, color: isLoss ? "#b91c1c" : "#15803d", fontWeight: 600 }}>
                  {d.percent >= 0 ? "+" : "-"}{Math.abs(d.percent).toFixed(2)}%
                </span>
              </div>
              <div style={{ marginTop: 8 }}>{renderSparkline(d.history, d.symbol)}</div>
              {d.history.length > 0 && (
                <button style={btnPrimary} onClick={() => setFullscreen({ open: true, symbol: d.symbol })}>
                  Ver gráfica completa
                </button>
              )}
            </div>
          );
        })}
      </section>

      {fullscreen.open && (
        <FullscreenModal
          symbol={fullscreen.symbol}
          prices={data.find((d) => d.symbol === fullscreen.symbol)?.history || []}
          onClose={() => setFullscreen({ open: false, symbol: null })}
        />
      )}
    </div>
  );
}

/* =========================
   Styles
========================= */
const pageStyle = { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "30px" };
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
const btnPrimary = { marginTop: 10, padding: "8px 12px", borderRadius: 8, background: "var(--uis-green)", color: "white", border: "none", cursor: "pointer" };
const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.36)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" };
const modalCard = { width: "90%", maxWidth: 1100, maxHeight: "90vh", background: "white", borderRadius: 12, padding: 20, overflowY: "auto" };
const modalClose = { padding: "6px 10px", borderRadius: 8, background: "var(--uis-green)", color: "white", border: "none", cursor: "pointer" };
