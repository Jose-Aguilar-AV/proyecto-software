import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  // 💡 Estado del modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🌓 Al cargar, aplicar tema guardado
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // 🚪 Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
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
      className={darkMode ? "dark" : ""}
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

      <div style={{ display: "flex", gap: "10px" }}>
        {/* 🌙 Botón de modo oscuro */}
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: "transparent",
            color: darkMode ? "yellow" : "black",
            border: "1px solid var(--uis-green-light)",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          {darkMode ? "Claro" : "Oscuro"}
        </button>

        {/* 🔐 Botón cerrar sesión */}
        <button
          onClick={logout}
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
      </div>
    </header>
  );
}
