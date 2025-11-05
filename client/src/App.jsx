import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Portafolios from "./pages/Portafolios";
import CrearPortafolio from "./pages/CrearPortafolio"; // 👈 nueva importación
import Transacciones from "./pages/Transacciones";
import Precios from "./pages/Precios";
import Rendimiento from "./pages/Rendimiento";
import Ahorro from "./pages/Ahorro";
import Aprendizaje from "./pages/Aprendizaje";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      {/* Contenedor general de toda la app */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh", // llena toda la pantalla
          overflow: "hidden",
        }}
      >
        {/* Sidebar (columna fija) */}
        <Sidebar />

        {/* Contenedor derecho (navbar + contenido) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
            backgroundColor: "#f5f5f5",
          }}
        >
          {/* Navbar arriba */}
          <Navbar />

          {/* Contenido principal debajo */}
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
              <Route path="/crear-portafolio" element={<CrearPortafolio />} /> {/* 👈 nueva ruta */}
              <Route path="/transacciones" element={<Transacciones />} />
              <Route path="/precios" element={<Precios />} />
              <Route path="/rendimiento" element={<Rendimiento />} />
              <Route path="/ahorro" element={<Ahorro />} />
              <Route path="/aprendizaje" element={<Aprendizaje />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
