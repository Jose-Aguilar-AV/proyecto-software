import { useEffect, useRef, useState } from "react";
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

export default function Portafolios() {
  const [assets, setAssets] = useState([]);
  const [balance, setBalance] = useState(5000);
  const [message, setMessage] = useState("");
  const [expandedSymbol, setExpandedSymbol] = useState(null);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState({ open: false, symbol: null });
  const [form, setForm] = useState({ symbol: "", name: "", sector: "" });

  const suggestions = [
    { symbol: "AAPL", name: "Apple Inc.", sector: "Tecnología" },
    { symbol: "MSFT", name: "Microsoft Corp.", sector: "Tecnología" },
    { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Tecnología" },
    { symbol: "AMZN", name: "Amazon.com, Inc.", sector: "Comercio" },
    { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Tecnología" },
    { symbol: "TSLA", name: "Tesla, Inc.", sector: "Automotriz" },
  ];

  const LS_ASSETS = "gestion_activos_assets_v1";
  const LS_SEARCHES = "gestion_activos_searches_v1";

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage.getItem(LS_ASSETS) || "null");
      if (Array.isArray(a)) setAssets(a);
    } catch {}
    try {
      const s = JSON.parse(localStorage.getItem(LS_SEARCHES) || "null");
      if (Array.isArray(s)) setRecentSearches(s);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_ASSETS, JSON.stringify(assets));
  }, [assets]);
  useEffect(() => {
    localStorage.setItem(LS_SEARCHES, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const pushRecentSearch = (q) => {
    if (!q || !q.trim()) return;
    const qU = q.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((x) => x.toLowerCase() !== qU.toLowerCase());
      filtered.unshift(qU);
      return filtered.slice(0, 10);
    });
  };

  const handleCreateAsset = (e) => {
    e.preventDefault();
    const sym = form.symbol.trim().toUpperCase();
    if (!sym) return;

    const lastPrice = 100;
    if (balance < lastPrice) {
      setMessage(`Saldo insuficiente para crear ${sym}. Saldo actual: $${balance.toFixed(2)}`);
      return;
    }

    const exists = assets.some((a) => a.symbol === sym);
    const payload = {
      symbol: sym,
      name: form.name.trim() || sym,
      sector: form.sector.trim() || "N/A",
      createdAt: new Date().toISOString(),
    };

    if (!exists) {
      setAssets((prev) => [payload, ...prev]);
      setBalance((prev) => prev - lastPrice);
    }

    setForm({ symbol: "", name: "", sector: "" });
    setModalOpen(false);
    pushRecentSearch(sym);
    setMessage("");
  };

  const removeAsset = (symbol) => {
    const lastPrice = 400;
    setAssets((prev) => prev.filter((a) => a.symbol !== symbol));
    setBalance((prev) => prev + lastPrice);
    if (expandedSymbol === symbol) setExpandedSymbol(null);
  };

  const toggleExpand = async (symbol) => {
    setExpandedSymbol((prev) => (prev === symbol ? null : symbol));
    if (!cache[symbol]) await fetchHistory(symbol);
  };

  const fetchHistory = async (symbol) => {
    if (!symbol || cache[symbol]) return;
    try {
      setLoading(symbol);
      const res = await api.get(`/historial?symbol=${symbol}`);
      const arr = Array.isArray(res.data) ? res.data : [];
      setCache((prev) => ({ ...prev, [symbol]: arr }));
    } catch (err) {
      console.error("Error fetching historial:", err);
      setCache((prev) => ({ ...prev, [symbol]: [] }));
    } finally {
      setLoading(null);
    }
  };

  const handleAddFromSearch = () => {
    const q = search.trim();
    if (!q) return;
    const sym = q.toUpperCase();
    const found = suggestions.find(
      (s) => s.symbol === sym || s.name.toLowerCase().includes(q.toLowerCase())
    );
    const lastPrice = 1000;
    if (balance < lastPrice) {
      setMessage(`Saldo insuficiente para comprar ${sym}. Saldo actual: $${balance.toFixed(2)}`);
      return;
    }
    const payload = found
      ? found
      : { symbol: sym, name: sym, sector: "N/A", createdAt: new Date().toISOString() };

    if (!assets.some((a) => a.symbol === payload.symbol)) {
      setAssets((prev) => [payload, ...prev]);
      setBalance((prev) => prev - lastPrice);
    }

    pushRecentSearch(q);
    setSearch("");
    setMessage("");
  };

  const openFullscreen = (symbol) => {
    setFullscreen({ open: true, symbol });
    if (!cache[symbol]) fetchHistory(symbol);
  };

  function ExpandingPanel({ isOpen, children }) {
    const ref = useRef(null);
    const [maxH, setMaxH] = useState(0);

    useEffect(() => {
      if (!ref.current) return;
      if (isOpen) setMaxH(ref.current.scrollHeight);
      else setMaxH(0);
    }, [isOpen, children]);

    return (
      <div
        ref={ref}
        style={{
          maxHeight: maxH,
          transition: "max-height 0.4s cubic-bezier(0.2,0.8,0.2,1)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    );
  }

  function MiniSparkline({ symbol }) {
    const data = cache[symbol] || [];
    const small = data.slice(-20);
    if (!small.length) {
      if (!loading && !cache[symbol]) fetchHistory(symbol);
      return (
        <div
          style={{
            height: 56,
            minHeight: 56,
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
      );
    }

    const chartData = {
      labels: small.map((d) => d.t),
      datasets: [
        {
          data: small.map((d) => d.c),
          borderColor: "rgba(34,197,94,1)",
          backgroundColor: "rgba(34,197,94,0.06)",
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
      elements: { line: { borderWidth: 2 } },
    };

    return (
      <div style={{ height: 56, minHeight: 56 }}>
        <Line data={chartData} options={options} />
      </div>
    );
  }

  function FullscreenModal({ symbol, onClose }) {
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
      <div style={modalOverlay} onClick={onClose}>
        <div style={modalCard} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0, color: "var(--uis-green)" }}>{symbol} — Vista ampliada</h3>
            <button style={modalCloseBtn} onClick={onClose}>
              Cerrar
            </button>
          </div>

          {(!data || data.length === 0) ? (
            <div style={{ padding: 18, color: "#64748b" }}>No hay datos para este símbolo.</div>
          ) : (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" }, title: { display: true, text: `Rendimiento — ${symbol}` } },
                scales: { x: { title: { display: true, text: "Fecha" } }, y: { title: { display: true, text: "Precio (USD)" } } },
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      {/* HEADER */}
      <header style={header}>
        <div>
          <h1 style={h1}>Gestión de Activos</h1>
          <p style={sub}>Saldo disponible: <strong>${balance.toFixed(2)}</strong></p>
          {message && <p style={{ color: "red", marginTop: 4 }}>{message}</p>}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", maxWidth: 420, width: "100%" }}>
            <input
              style={searchInput}
              placeholder="Buscar por símbolo o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAddFromSearch(); }}
            />
            {search.trim().length > 0 && (
              <div style={dropdown}>
                {suggestions
                  .filter(
                    (s) =>
                      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
                      s.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 8)
                  .map((s) => (
                    <div key={s.symbol} style={dropdownItem} onClick={() => setSearch(s.symbol)}>
                      <strong style={{ marginRight: 8 }}>{s.symbol}</strong>
                      <span style={{ color: "#64748b" }}>{s.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <button style={btnPrimary} onClick={handleAddFromSearch}>
            Añadir
          </button>
          <button style={btnSecondary} onClick={() => setModalOpen(true)}>
            Crear activo
          </button>
        </div>
      </header>

      {recentSearches.length > 0 && (
        <div style={{ marginBottom: 18, color: "#475569" }}>
          Búsquedas recientes:{" "}
          {recentSearches.map((s, i) => (
            <button key={i} style={searchTag} onClick={() => setSearch(s)}>{s}</button>
          ))}
        </div>
      )}

      {assets.length === 0 ? (
        <div style={emptyBox}>
          <h2 style={{ color: "var(--uis-green)", margin: 0 }}>Aún no tienes activos</h2>
          <p style={{ color: "#64748b", marginTop: 8 }}>
            Crea tu primer activo para empezar a gestionar y explorar datos históricos.
          </p>
          <div style={{ marginTop: 14 }}>
            <button style={btnPrimary} onClick={() => setModalOpen(true)}>Crear mi primer activo</button>
          </div>
        </div>
      ) : (
        <div style={grid}>
          {assets.map((a) => {
            const lastPrice = cache[a.symbol]?.length
              ? cache[a.symbol][cache[a.symbol].length - 1].c
              : null;
            return (
              <div key={a.symbol} style={{
                ...card,
                borderColor: expandedSymbol === a.symbol ? "var(--uis-green)" : "#E2E8F0",
              }}>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleExpand(a.symbol)}>
                  <h3 style={{ margin: 0, color: "var(--uis-green)" }}>
                    {a.name} <span style={{ color: "#64748b", fontWeight: 600 }}>({a.symbol})</span>
                  </h3>
                  <p style={{ margin: "8px 0 12px 0", color: "#475569", fontSize: 13 }}>
                    Haz clic para ver la gráfica histórica.
                  </p>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ minWidth: 110 }}>
                      <p style={{ margin: 0, fontWeight: 700 }}>{lastPrice ? `$${lastPrice.toFixed(2)}` : "—"}</p>
                      <p style={{ margin: "6px 0 0 0", color: "#64748b", fontSize: 12 }}>{a.sector}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <MiniSparkline symbol={a.symbol} />
                    </div>
                  </div>
                </div>

                <ExpandingPanel isOpen={expandedSymbol === a.symbol}>
                  <div style={{ marginTop: 12 }}>
                    {loading === a.symbol ? (
                      <p style={{ color: "#64748b" }}>Cargando gráfica...</p>
                    ) : cache[a.symbol]?.length > 0 ? (
                      <div style={{ borderRadius: 10, padding: 12, border: "1px solid #e6eef7", background: "white" }}>
                        <Line
                          data={{
                            labels: cache[a.symbol].map((d) => new Date(d.t).toLocaleDateString()),
                            datasets: [
                              {
                                label: "Cierre",
                                data: cache[a.symbol].map((d) => d.c),
                                borderColor: "rgba(75,192,192,1)",
                                backgroundColor: "rgba(75,192,192,0.18)",
                                tension: 0.3,
                              },
                              {
                                label: "Apertura",
                                data: cache[a.symbol].map((d) => d.o),
                                borderColor: "rgba(255,99,132,1)",
                                backgroundColor: "rgba(255,99,132,0.12)",
                                tension: 0.3,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            plugins: { legend: { position: "top" }, title: { display: true, text: `Rendimiento — ${a.symbol}` } },
                          }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                          <button style={btnPrimary} onClick={() => openFullscreen(a.symbol)}>Ver en grande</button>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: "#64748b" }}>No hay datos disponibles.</p>
                    )}
                  </div>
                </ExpandingPanel>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 8 }}>
                  <button style={smallBtn} onClick={() => toggleExpand(a.symbol)}>
                    {expandedSymbol === a.symbol ? "Cerrar" : "Abrir"}
                  </button>
                  <button style={dangerBtn} onClick={() => removeAsset(a.symbol)}>Eliminar</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div style={modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, color: "var(--uis-green)" }}>Crear nuevo activo</h2>
            <form onSubmit={handleCreateAsset}>
              <label style={label}>Símbolo</label>
              <input style={input} value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value })} placeholder="Ej: AAPL" required />
              <label style={label}>Nombre</label>
              <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Apple Inc." />
              <label style={label}>Sector</label>
              <input style={input} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} placeholder="Ej: Tecnología" />
              <button style={btnPrimary} type="submit">Crear activo</button>
            </form>
          </div>
        </div>
      )}

      {fullscreen.open && (
        <FullscreenModal
          symbol={fullscreen.symbol}
          onClose={() => setFullscreen({ open: false, symbol: null })}
        />
      )}
    </div>
  );
}

// ------------------ ESTILOS ------------------
const page = { padding: 18, maxWidth: 1280, margin: "0 auto", fontFamily: "Arial, sans-serif" };
const header = { display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 18, gap: 12 };
const h1 = { margin: 0, color: "var(--uis-green)" };
const sub = { margin: 0, color: "#475569" };
const grid = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "start" };
const card = { padding: 16, borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden" };
const emptyBox = { textAlign: "center", marginTop: 80 };
const searchInput = { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1" };
const dropdown = { position: "absolute", top: 38, left: 0, width: "100%", background: "#fff", border: "1px solid #cbd5e1", borderRadius: 6, zIndex: 100, maxHeight: 220, overflowY: "auto" };
const dropdownItem = { padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnPrimary = { padding: "6px 12px", background: "var(--uis-green)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
const btnSecondary = { padding: "6px 12px", background: "var(--uis-green)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
const smallBtn = { padding: "4px 10px", fontSize: 12, borderRadius: 4, border: "1px solid #13e104ff", cursor: "pointer", background: "#0b7303ff" };
const dangerBtn = { padding: "4px 10px", fontSize: 12, borderRadius: 4, border: "1px solid #ef4444", cursor: "pointer", background: "#fee2e2", color: "#b91c1c" };
const searchTag = { padding: "2px 8px", background: "#e2e8f0", borderRadius: 4, fontSize: 12, cursor: "pointer" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 };
const modalCard = { background: "#fff", borderRadius: 10, padding: 20, maxWidth: 480, width: "90%", maxHeight: "90vh", overflowY: "auto", position: "relative" };
const modalCloseBtn = { padding: "4px 10px", borderRadius: 4, border: "none", background: "#ef4444", color: "#fff", cursor: "pointer" };
const input = { width: "100%", padding: 6, borderRadius: 4, border: "1px solid #cbd5e1", marginBottom: 10 };
const label = { display: "block", marginBottom: 4, fontWeight: 600 };
