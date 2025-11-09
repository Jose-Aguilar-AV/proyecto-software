import { Link } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#f9faf9",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#fff",
          borderBottom: "2px solid #7FBA00",
          padding: "16px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ color: "#7FBA00", fontSize: 28, margin: 0 }}>
          <span style={{ color: "#444" }}>Plataforma de </span>Inversiones
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#333", fontWeight: 500 }}>
            Sesión: <b>{user?.correo}</b>
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#c0392b")}
            onMouseOut={(e) => (e.target.style.background = "#e74c3c")}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main
        style={{
          maxWidth: 900,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: "#222", marginBottom: 8 }}>
          Bienvenido <span style={{ fontSize: 22 }}>👋</span>
        </h2>
        <p style={{ color: "#555", marginBottom: 24 }}>
          Usa las acciones rápidas para administrar tu cuenta.
        </p>

        <div style={{ display: "flex", gap: 16 }}>
          <Link
            to="/perfil"
            style={{
              padding: "10px 18px",
              background: "#7FBA00",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              transition: "background 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#6aa300")}
            onMouseOut={(e) => (e.target.style.background = "#7FBA00")}
          >
            Editar mi perfil
          </Link>

          <Link
            to="/usuarios"
            style={{
              padding: "10px 18px",
              background: "#f1f1f1",
              color: "#333",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              border: "1px solid #ccc",
              transition: "background 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e6e6e6")}
            onMouseOut={(e) => (e.target.style.background = "#f1f1f1")}
          >
            Gestionar usuarios
          </Link>
        </div>
      </main>
    </div>
  );
}
