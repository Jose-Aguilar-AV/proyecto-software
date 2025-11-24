import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();

  // 🚪 Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };

  // 🌙 Redirigir a la versión dark según la página actual
  const goToDarkPage = () => {
    switch (location.pathname) {
      case "/":
        nav("/inicio-dark");
        break;
      case "/aprendizaje":
        nav("/aprendizaje-dark");
        break;
      case "/perfil":
        nav("/perfil-dark");
        break;
      default:
        break;
    }
  };

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
      <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "var(--uis-green)" }}>
        Plataforma de Inversiones
      </h1>

      <div style={{ display: "flex", gap: "10px" }}>
        

        <button
          onClick={logout}
          style={{
            backgroundColor: "var(--uis-green)",
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
      </div>
    </header>
  );
}
