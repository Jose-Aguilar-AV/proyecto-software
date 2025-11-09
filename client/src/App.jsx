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

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* === 🟢 RUTAS PÚBLICAS (pre-login) === */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/home" element={<Home />} />

      {/* === 🔐 RUTAS PRIVADAS (post-login) === */}
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
                  backgroundColor: "#f5f5f5",
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

      {/* 🔁 Ruta desconocida */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
