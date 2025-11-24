function StockChart({ symbol }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedBig, setExpandedBig] = useState(false); // <-- NUEVO

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/historial?symbol=${symbol}`);
        if (!mounted) return;
        setData(res.data || []);
      } catch (err) {
        console.error("Error cargando historial:", err);
        if (!mounted) return;
        setError("No se pudo cargar el historial de " + symbol);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [symbol]);

  const chartData = {
    labels: data.map((d) => new Date(d.t).toLocaleDateString()),
    datasets: [
      {
        label: "Cierre",
        data: data.map((d) => d.c),
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.25,
        pointRadius: 0,
      },
      {
        label: "Apertura",
        data: data.map((d) => d.o),
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.12)",
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
      title: { display: true, text: `Rendimiento — ${symbol}` },
    },
    scales: {
      x: { title: { display: true, text: "Fecha" } },
      y: { title: { display: true, text: "Precio (USD)" } },
    },
  };

  /* ---------------------- */
  /* VISTA EXPANDIDA GRANDE */
  /* ---------------------- */
  if (expandedBig) {
    return (
      <div style={bigWrapper}>
        <button style={bigCloseBtn} onClick={() => setExpandedBig(false)}>
          Cerrar vista grande
        </button>
        <div style={bigCard}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  }

  /* ---------------------- */
  /* VISTA NORMAL PEQUEÑA */
  /* ---------------------- */
  return (
    <div style={{ marginTop: 10 }}>
      {loading ? (
        <div style={skeletonStyle}>
          <div style={{ height: 14, width: "40%", background: "#e6eef7", borderRadius: 6, marginBottom: 12 }} />
          <div style={{ height: 260, width: "100%", background: "#eef6fb", borderRadius: 8 }} />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : data.length === 0 ? (
        <p style={{ color: "#475569" }}>No hay datos para {symbol}.</p>
      ) : (
        <div style={{ position: "relative" }}>
          {/* Mini opción para ampliar */}
          <div style={miniCard} onClick={() => setExpandedBig(true)}>
            Ver grande
          </div>

          <div
            style={{
              background: "white",
              borderRadius: 10,
              padding: 12,
              border: "1px solid #e6eef7",
            }}
          >
            <Line data={chartData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}
