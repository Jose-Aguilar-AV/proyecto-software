import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Folder,
  CreditCard,
  DollarSign,
  TrendingUp,
  PiggyBank,
  BookOpen,
  User,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      style={{
        width: isOpen ? "185px" : "70px",
        backgroundColor: "var(--uis-green)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "15px 10px",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: isOpen ? "space-between" : "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {isOpen && (
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>Menú</h2>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
          title={isOpen ? "Ocultar menú" : "Mostrar menú"}
        >
          {isOpen ? "⮜" : "☰"}
        </button>
      </div>

      {/* Enlaces */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {menuItems.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            style={{
              ...linkStyle,
              justifyContent: isOpen ? "flex-start" : "center",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
            {isOpen && <span style={{ marginLeft: "10px" }}>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

const menuItems = [
  { path: "/", label: "Inicio", icon: <Home size={20} color="white" /> },
  { path: "/portafolios", label: "Portafolios", icon: <Folder size={20} color="white" /> },
  { path: "/transacciones", label: "Transacciones", icon: <CreditCard size={20} color="white" /> },
  { path: "/precios", label: "Precios", icon: <DollarSign size={20} color="white" /> },
  { path: "/rendimiento", label: "Rendimiento", icon: <TrendingUp size={20} color="white" /> },
  { path: "/ahorro", label: "Ahorro", icon: <PiggyBank size={20} color="white" /> },
  { path: "/aprendizaje", label: "Aprendizaje", icon: <BookOpen size={20} color="white" /> },
  { path: "/perfil", label: "Perfil", icon: <User size={20} color="white" /> },
];

const linkStyle = {
  display: "flex",
  alignItems: "center",
  color: "white",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  fontWeight: 500,
  transition: "background-color 0.2s",
};
