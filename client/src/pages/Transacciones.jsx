import { useState, useEffect } from "react";

export default function Transacciones() {
  const [balance, setBalance] = useState(1400); // saldo inicial
  const [transactions, setTransactions] = useState([]);
  const [newQty, setNewQty] = useState(1); // cantidad para nueva transacción
  const NVDA_PRICE = 500; // precio simulado de NVDA

  useEffect(() => {
    // Transacciones iniciales: compras y ventas previas
    const now = new Date();
    setTransactions([
      { id: 1, type: "Compra", symbol: "AAPL", quantity: 2, price: 500, date: now.toLocaleDateString() },   // 1700
      { id: 2, type: "Compra", symbol: "AMZN", quantity: 4, price: 250, date: now.toLocaleDateString() },  // 3300
      { id: 3, type: "Compra", symbol: "AMD", quantity: 1, price: 1000, date: now.toLocaleDateString() },    // 110
      { id: 4, type: "Compra", symbol: "NVDA", quantity: 2, price: 500, date: now.toLocaleDateString() },   // 500
      { id: 5, type: "Venta", symbol: "GOOGL", quantity: 1, price: 400, date: now.toLocaleDateString() },
    ]);
  }, []);

  const handleBuyNVDA = () => {
    const totalCost = NVDA_PRICE * newQty;
    if (totalCost > balance) {
      alert("Saldo insuficiente para esta compra.");
      return;
    }
    const now = new Date();
    setTransactions(prev => [
      ...prev,
      { id: prev.length + 1, type: "Compra", symbol: "NVDA", quantity: newQty, price: NVDA_PRICE, date: now.toLocaleDateString() },
    ]);
    setBalance(prev => prev - totalCost);
    setNewQty(1);
  };

  const compras = transactions.filter(t => t.type === "Compra");
  const ventas = transactions.filter(t => t.type === "Venta");

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Transacciones</h2>
        <p style={subtitleStyle}>
          Visualiza y gestiona todas tus operaciones financieras.
        </p>
        <p style={{ fontWeight: 600, marginTop: 6 }}>Saldo disponible: ${balance.toFixed(2)}</p>
      </header>

      <section style={{ marginBottom: 20 }}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Nueva Transacción — Comprar NVDA</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <input
              type="number"
              min={1}
              value={newQty}
              onChange={(e) => setNewQty(Number(e.target.value))}
              style={{ ...inputStyle, width: 80 }}
            />
            <button style={btnPrimary} onClick={handleBuyNVDA}>Comprar NVDA @ ${NVDA_PRICE}</button>
          </div>
        </div>
      </section>

      <section style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Compras</h3>
          {compras.length === 0 ? (
            <p style={{ color: "#64748b" }}>No hay compras registradas.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Símbolo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {compras.map(t => (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td>{t.symbol}</td>
                    <td>{t.quantity}</td>
                    <td>${t.price.toFixed(2)}</td>
                    <td>${(t.price * t.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Ventas</h3>
          {ventas.length === 0 ? (
            <p style={{ color: "#64748b" }}>No hay ventas registradas.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Símbolo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map(t => (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td>{t.symbol}</td>
                    <td>{t.quantity}</td>
                    <td>${t.price.toFixed(2)}</td>
                    <td>${(t.price * t.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};
const inputStyle = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #CBD5E1",
  outline: "none",
};
const btnPrimary = {
  padding: "8px 12px",
  borderRadius: 8,
  background: "var(--uis-green)",
  color: "white",
  border: "none",
  cursor: "pointer",
};
