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

export default function Precios() {
  const defaultCompanies = [
    { symbol: "AAPL", name: "Apple Inc.", sector: "Tecnología" },
    { symbol: "TSLA", name: "Tesla, Inc.", sector: "Automotriz" },
    { symbol: "AMZN", name: "Amazon.com, Inc.", sector: "Comercio" },
    { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Tecnología" },
  ];

  const moreOptions = [
    { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Tecnología" },
    { symbol: "NFLX", name: "Netflix, Inc.", sector: "Entretenimiento" },
    { symbol: "INTC", name: "Intel Corporation", sector: "Tecnología" },
    { symbol: "AMD", name: "Advanced Micro Devices", sector: "Tecnología" },
    { symbol: "MSFT", name: "Microsoft Corporation", sector: "Tecnología" },
    { symbol: "META", name: "Meta Platforms", sector: "Tecnología" },
  ];

  const [companies, setCompanies] = useState(defaultCompanies);
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [cache, setCache] = useState({});
  const [loadingSymbol, setLoadingSymbol] = useState(null);
  const [fullscreen, setFullscreen] = useState({ open: false, symbol: null });

  const toggle = (symbol) => {
    setExpanded((prev) => (prev === symbol ? null : symbol));
    if (!cache[symbol]) fetchHistory(symbol);
  };

  const addCompanyBySymbol = (symbol) => {
    if (!symbol) return;
    if (companies.some((c) => c.symbol === symbol)) return;

    const found = [...defaultCompanies, ...moreOptions].find((c) => c.symbol === symbol);
    const payload = found ? found : { symbol, name: symbol, sector: "N/A" };

    setCompanies((prev) => [...prev, payload]);
    setSelected("");
    setQuery("");
  };

  const removeCompany = (symbol) => {
    setCompanies((prev) => prev.filter((c) => c.symbol !== symbol));
    if (expanded === symbol) setExpanded(null);
  };

  const fetchHistory = async (symbol) => {
    if (!symbol) return;
    if (cache[symbol]) return;
    try {
      setLoadingSymbol(symbol);
      const res = await api.get(`/historial?symbol=${symbol}`);
      const arr = Array.isArray(res.data) ? res.data : [];
      setCache((prev) => ({ ...prev, [symbol]: arr }));
    } catch (err) {
      console.error("Error fetching historial", err);
      setCache((prev) => ({ ...prev, [symbol]: [] }));
    } finally {
      setLoadingSymbol(null);
    }
  };

  const options = [...defaultCompanies, ...moreOptions].filter((o) => {
    if (!query) return false; // ❗IMPORTANTE: ahora NUNCA muestra nada si query está vacío
    const q = query.toLowerCase();
    return o.symbol.toLowerCase().includes(q) || o.name.toLowerCase().includes(q);
  });

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Precios del Mercado</h1>
        <p style={subtitleStyle}>
          Haz clic en una tarjeta para ver su rendimiento histórico. Puedes agregar empresas desde el buscador.
        </p>
      </header>

      {/* Search */}
      <div style={searchWrapper}>
        <div style={searchBox}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o símbolo..."
            style={searchInput}
          />

          {/* Solo aparece SI query tiene algo */}
          {query && (
            <div style={dropdown}>
              {options.slice(0, 8).map((o) => (
                <div
                  key={o.symbol}
                  style={dropdownItem}
                  onClick={() => addCompanyBySymbol(o.symbol)}
                >
                  <strong style={{ marginRight: 8 }}>{o.symbol}</strong>
                  <span style={{ color: "#64748b" }}>{o.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          style={addBtn}
          onClick={() => {
            if (selected) addCompanyBySymbol(selected);
            else if (query) addCompanyBySymbol(query.toUpperCase());
          }}
        >
          Añadir
        </button>
      </div>

      {/* Grid */}
      <div style={gridStyle}>
        {companies.map((c) => (
          <div
            key={c.symbol}
            style={{
              ...cardStyle,
              borderColor: expanded === c.symbol ? "var(--uis-green)" : cardStyle.border,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggle(c.symbol)}>
                <h3 style={cardTitle}>
                  {c.name} <span style={{ color: "#64748b" }}>({c.symbol})</span>
                </h3>

                <p style={{ margin: "6px 0 8px 0", color: "#475569", fontSize: 13 }}>
                  Haz clic para ver el rendimiento histórico.
                </p>

                {/* Mini detalle + sparkline */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ minWidth: 120 }}>
                    <p style={{ margin: 0, color: "#334155", fontWeight: 600 }}>
                      {cache[c.symbol] && cache[c.symbol].length
                        ? `$${cache[c.symbol][cache[c.symbol].length - 1].c.toFixed(2)}`
                        : "—"}
                    </p>
                    <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 12 }}>{c.sector}</p>
                  </div>

                  <div style={{ flex: 1 }}>
                    <MiniSparkline symbol={c.symbol} cache={cache} fetchHistory={fetchHistory} />
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 12, display: "flex", gap: 8 }}>
                <button
                  onClick={() => toggle(c.symbol)}
                  style={smallBtn}
                  aria-expanded={expanded === c.symbol}
                >
                  {expanded === c.symbol ? "Cerrar" : "Abrir"}
                </button>

                <button onClick={() => removeCompany(c.symbol)} style={removeBtn}>
                  ✕
                </button>
              </div>
            </div>

            {/* Gráfica expandida */}
            <div
              style={{
                maxHeight: expanded === c.symbol ? 720 : 0,
                overflow: "hidden",
                transition: "max-height 0.5s ease",
                marginTop: expanded === c.symbol ? 18 : 0,
              }}
            >
              {expanded === c.symbol && (
                <div>
                  {loadingSymbol === c.symbol && (
                    <p style={{ color: "#475569" }}>Cargando gráfica...</p>
                  )}

                  {cache[c.symbol] && cache[c.symbol].length > 0 ? (
                    <div style={{ background: "white", borderRadius: 10, padding: 12, border: "1px solid #e6eef7" }}>
                      <Line
                        data={{
                          labels: cache[c.symbol].map((d) => new Date(d.t).toLocaleDateString()),
                          datasets: [
                            {
                              label: "Cierre",
                              data: cache[c.symbol].map((d) => d.c),
                              borderColor: "rgba(75, 192, 192, 1)",
                              backgroundColor: "rgba(75, 192, 192, 0.2)",
                              tension: 0.3,
                            },
                            {
                              label: "Apertura",
                              data: cache[c.symbol].map((d) => d.o),
                              borderColor: "rgba(255, 99, 132, 1)",
                              backgroundColor: "rgba(255, 99, 132, 0.15)",
                              tension: 0.3,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "top" },
                            title: { display: true, text: `Rendimiento de ${c.symbol}` },
                          },
                        }}
                      />

                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        <button
                          style={viewLargeBtn}
                          onClick={() => setFullscreen({ open: true, symbol: c.symbol })}
                        >
                          Ver en grande
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: "#64748b" }}>No hay datos disponibles.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal fullscreen */}
      {fullscreen.open && (
        <div style={modalOverlay} onClick={() => setFullscreen({ open: false, symbol: null })}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              style={modalClose}
              onClick={() => setFullscreen({ open: false, symbol: null })}
            >
              Cerrar vista grande
            </button>

            <div style={{ height: "100%", width: "100%" }}>
              <FullscreenChart symbol={fullscreen.symbol} cache={cache} fetchHistory={fetchHistory} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* MiniSparkline */
function MiniSparkline({ symbol, cache, fetchHistory }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const ensure = async () => {
      if (cache[symbol]) return;
      setLoading(true);
      try {
        await fetchHistory(symbol);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    ensure();
    return () => (mounted = false);
  }, [symbol, cache, fetchHistory]);

  const data = cache[symbol] || [];
  const smallData = data.slice(-20);

  const chartData = {
    labels: smallData.map((d) => new Date(d.t).toLocaleDateString()),
    datasets: [
      {
        data: smallData.map((d) => d.c),
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.08)",
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { borderWidth: 2 } },
  };

  return (
    <div style={{ height: 60 }}>
      {loading ? (
        <div style={{ height: 60, background: "#eef6fb", borderRadius: 8 }} />
      ) : smallData.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div
          style={{
            height: 60,
            background: "#fff",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94a3b8",
          }}
        >
          sin datos
        </div>
      )}
    </div>
  );
}

/* FullscreenChart */
function FullscreenChart({ symbol, cache, fetchHistory }) {
  const [loading, setLoading] = useState(!cache[symbol]);

  useEffect(() => {
    const load = async () => {
      if (!symbol) return;
      if (!cache[symbol]) {
        setLoading(true);
        await fetchHistory(symbol);
        setLoading(false);
      }
    };
    load();
  }, [symbol, cache, fetchHistory]);

  const data = cache[symbol] || [];

  const chartData = {
    labels: data.map((d) => new Date(d.t).toLocaleDateString()),
    datasets: [
      {
        label: "Cierre",
        data: data.map((d) => d.c),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.18)",
        tension: 0.3,
      },
      {
        label: "Apertura",
        data: data.map((d) => d.o),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.12)",
        tension: 0.3,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: `Rendimiento — ${symbol}` },
        },
      }}
    />
  );
}

/* Styles */

const pageStyle = {
  padding: 28,
  background: "#f8fafc",
  minHeight: "100vh",
  fontFamily: "Inter, system-ui, Arial, sans-serif",
};

const headerStyle = { marginBottom: 14 };
const titleStyle = { color: "var(--uis-green)", fontSize: 28, margin: 0 };
const subtitleStyle = { color: "#64748b", marginTop: 6, marginBottom: 18 };

const searchWrapper = {
  width: "100%",
  maxWidth: 820,
  marginBottom: 18,
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
};

const searchBox = { flex: 1, position: "relative", maxWidth: 620 };

const searchInput = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #CBD5E1",
  outline: "none",
  fontSize: 15,
  background: "white",
  boxSizing: "border-box",
};

const dropdown = {
  position: "absolute",
  top: "46px",
  left: 0,
  right: 0,
  background: "white",
  border: "1px solid #E6EEF7",
  borderRadius: 8,
  boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
  zIndex: 50,
  maxHeight: 260,
  overflow: "auto",
};

const dropdownItem = {
  padding: "8px 12px",
  borderBottom: "1px solid #f1f5f9",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const addBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "var(--uis-green)",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  marginTop: 8,
};

const cardStyle = {
  background: "white",
  borderRadius: 12,
  padding: 16,
  border: "1px solid #E2E8F0",
  boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
};

const cardTitle = { color: "var(--uis-green)", marginBottom: 6, fontSize: 16 };

const smallBtn = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #CBD5E1",
  background: "white",
  cursor: "pointer",
};

const removeBtn = {
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid #fecaca",
  background: "#fff1f2",
  color: "#991b1b",
  cursor: "pointer",
};

const viewLargeBtn = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "var(--uis-green)",
  color: "white",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
};

const modalCard = {
  width: "92%",
  maxWidth: 1100,
  height: "82vh",
  background: "white",
  borderRadius: 14,
  padding: 18,
  position: "relative",
};

const modalClose = {
  position: "absolute",
  top: 14,
  right: 14,
  padding: "8px 12px",
  background: "var(--uis-green)",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
