export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "var(--uis-green-light)",
        }}
      >
        Plataforma de Inversiones
      </h1>

      <button
        style={{
          backgroundColor: "var(--uis-green-light)",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Cerrar sesión
      </button>
    </header>
  );
}
