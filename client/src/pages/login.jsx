import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";

export default function Login() {
  const nav = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/api/login", {
        correo: correo.trim().toLowerCase(),
        contrasena: contrasena.trim(),
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.usuario || {}));
      setMensaje("✅ Inicio de sesión exitoso");
      nav("/");
    } catch (err) {
      setMensaje(
        err?.response?.data?.mensaje || "❌ Credenciales incorrectas"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(600px 400px at 50% -100px, #ecf8e5, #ffffff 70%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fff",
          padding: "32px 28px",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8e2",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#7FBA00",
            marginBottom: 24,
          }}
        >
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={{
              width: "100%",
              marginBottom: 12,
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{
              width: "100%",
              marginBottom: 16,
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#7FBA00",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#6aa300")}
            onMouseOut={(e) => (e.target.style.background = "#7FBA00")}
          >
            Ingresar
          </button>
        </form>

        {mensaje && (
          <p
            style={{
              marginTop: 14,
              textAlign: "center",
              color: mensaje.includes("exitoso") ? "#7FBA00" : "red",
              fontWeight: 500,
            }}
          >
            {mensaje}
          </p>
        )}

        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 14,
          }}
        >
          ¿No tienes cuenta?{" "}
          <Link
            to="/registro"
            style={{
              color: "#7FBA00",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
