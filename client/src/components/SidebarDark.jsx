import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, User } from "lucide-react";

export default function SidebarDark() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: "/inicio-dark", label: "Inicio", icon: <Home size={20} color="#f9fafb" /> },
    { path: "/aprendizaje-dark", label: "Aprendizaje", icon: <BookOpen size={20} color="#f9fafb" /> },
    { path: "/perfil-dark", label: "Perfil", icon: <User size={20} color="#f9fafb" /> },
  ];

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    color: "#f9fafb",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    fontWeight: 500,
    transition: "background-color 0.2s",
  };

  return (
    <aside
      style={{
        width: isOpen ? "185px" : "70px",
        backgroundColor: "#111827",
        color: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        padding: "15px 10px",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: isOpen ? "space-between" : "center", alignItems: "center", marginBottom: "20px" }}>
        {isOpen && <h2 style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem", color: "#f9fafb" }}>Menú</h2>}
        <button
          onClick={toggleSidebar}
          style={{ background: "transparent", border: "none", color: "#f9fafb", fontSize: "1.4rem", cursor: "pointer" }}
          title={isOpen ? "Ocultar menú" : "Mostrar menú"}
        >
          {isOpen ? "⮜" : "☰"}
        </button>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {menuItems.map(({ path, label, icon }) => (
          <Link key={path} to={path} style={{ ...linkStyle, justifyContent: isOpen ? "flex-start" : "center" }}>
            <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
            {isOpen && <span style={{ marginLeft: "10px" }}>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
