import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarDark() {
  const nav = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };

  const goToLightPage = () => {
    const map = {
      "/inicio-dark": "/",
      "/aprendizaje-dark": "/aprendizaje",
      "/perfil-dark": "/perfil",
    };
    if (map[location.pathname]) nav(map[location.pathname]);
  };

  return (
    <header
      style={{
        backgroundColor: "#111827",
        borderBottom: "1px solid #374151",
        padding: "10px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        color: "#f9fafb",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "#34d399" }}>
        Plataforma de Inversiones
      </h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={goToLightPage}
          style={{
            backgroundColor: "transparent",
            color: "#f9fafb",
            border: "1px solid #34d399",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Modo Claro
        </button>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#34d399",
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
