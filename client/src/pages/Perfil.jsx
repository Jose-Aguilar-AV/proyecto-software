import { useState, useEffect } from "react";
import api from "../lib/api";

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
  });
  const [msg, setMsg] = useState("");

  // Cargar datos del usuario
  useEffect(() => {
    setForm({
      nombre: user.nombre || "",
      correo: user.correo || "",
      contrasena: "",
    });
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const { data } = await api.put(`/api/usuarios/${user.id}`, form);
      localStorage.setItem("user", JSON.stringify(data.usuario));
      setMsg("✅ Cambios guardados");
    } catch (err) {
      console.error(err);
      setMsg("❌ No se pudo actualizar el perfil");
    }
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Perfil</h2>
        <p style={subtitleStyle}>
          Administra tu información personal y preferencias de usuario.
        </p>
      </header>

      <section style={gridStyle}>
        {/* 🟢 Formulario funcional de actualización */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Datos Personales</h3>
          <form onSubmit={guardar} style={formStyle}>
            <label style={labelStyle}>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>Correo</label>
            <input
              value={form.correo}
              disabled
              style={{
                ...inputStyle,
                background: "#f1f5f9",
                color: "#555",
              }}
            />

            <label style={labelStyle}>Contraseña nueva (opcional)</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={onChange}
              style={inputStyle}
            />

            <button type="submit" style={btnStyle}>
              💾 Guardar cambios
            </button>
          </form>
          {msg && <p style={msgStyle}>{msg}</p>}
        </div>

        {/* 🔒 Segunda tarjeta: información extra */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Seguridad</h3>
          <p>
            Cambia tu contraseña y configura opciones adicionales de acceso.
          </p>
        </div>
      </section>
    </div>
  );
}

/* === Estilos combinados === */
const pageStyle = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};
const headerStyle = { marginBottom: "20px" };
const titleStyle = { color: "var(--uis-green)", marginBottom: "5px" };
const subtitleStyle = { color: "#64748b", margin: 0 };
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};
const cardStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0",
};
const cardTitle = { color: "var(--uis-green)", marginBottom: "10px" };

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "10px",
};
const labelStyle = { fontWeight: 500, color: "#334155" };
const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
};
const btnStyle = {
  backgroundColor: "var(--uis-green-light)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "10px",
  fontWeight: 500,
  cursor: "pointer",
  marginTop: "10px",
};
const msgStyle = { marginTop: "10px", color: "#334155" };
