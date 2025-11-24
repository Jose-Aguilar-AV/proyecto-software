
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Portafolios from "./pages/Portafolios";
import CrearPortafolio from "./pages/CrearPortafolio";
import Transacciones from "./pages/Transacciones";
import Precios from "./pages/Precios";
import Rendimiento from "./pages/Rendimiento";
import Ahorro from "./pages/Ahorro";
import Aprendizaje from "./pages/Aprendizaje";
import Perfil from "./pages/Perfil";
import Usuarios from "./pages/Usuarios";
import { useUIStore } from "./store/useUIStore";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const theme = useUIStore((s) => s.theme);

  return (
    <div className={theme === "dark" ? "dark-mode" : "light-mode"}>

      <Routes>
        {/* === 🟢 RUTAS PÚBLICAS === */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />

        {/* === 🔐 RUTAS PRIVADAS === */}
        <Route
          path="/*"
          element={
            <Protected>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100vh",
                  overflow: "hidden",
                }}
              >
                <Sidebar />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    height: "100%",
                    /* 🔥 Cambiamos gris fijo → variable del tema */
                    backgroundColor: "var(--bg)",
                  }}
                >
                  <Navbar />

                  <main
                    style={{
                      flexGrow: 1,
                      overflowY: "auto",
                      padding: "20px",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/portafolios" element={<Portafolios />} />
                      <Route path="/crear-portafolio" element={<CrearPortafolio />} />
                      <Route path="/transacciones" element={<Transacciones />} />
                      <Route path="/precios" element={<Precios />} />
                      <Route path="/rendimiento" element={<Rendimiento />} />
                      <Route path="/ahorro" element={<Ahorro />} />
                      <Route path="/aprendizaje" element={<Aprendizaje />} />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route path="/usuarios" element={<Usuarios />} />
                    </Routes>
                  </main>

                </div>
              </div>
            </Protected>
          }
        />

        {/* 🔄 Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
