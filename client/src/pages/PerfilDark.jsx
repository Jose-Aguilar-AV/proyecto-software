import { useState, useEffect } from "react";
import api from "../lib/api";

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    pais: "",
    timezone: "",
    correo: "",
    contrasena: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Tarjetas expandibles
  const [abierto, setAbierto] = useState(null);
  const toggle = (i) => setAbierto(abierto === i ? null : i);

  // Contenido de tarjetas (todas útiles)
  const ajustes = [
    {
      titulo: "Cambiar Contraseña",
      descripcion:
        "Actualiza tu contraseña para mantener la seguridad de tu cuenta.",
      
    },
    {
      titulo: "Cambiar Imagen de Perfil",
      descripcion: "Sube o reemplaza tu foto de perfil.",
      
    },
    {
      titulo: "Borrar Cuenta",
      descripcion: "Elimina tu cuenta permanentemente (acción irreversible).",
      
    },
  ];

  // Cargar datos del usuario
  useEffect(() => {
    setForm({
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      telefono: user.telefono || "",
      pais: user.pais || "",
      timezone: user.timezone || "",
      correo: user.correo || "",
      contrasena: "",
    });
  }, []);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const guardar = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const { data } = await api.put(`/api/usuarios/${user.id}`, form);
      localStorage.setItem("user", JSON.stringify(data.usuario));
      setMsg("✔ Cambios guardados correctamente");
    } catch (err) {
      console.error(err);
      setMsg("❌ No se pudo actualizar el perfil");
    }

    setLoading(false);
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Perfil del Usuario</h2>
        <p style={subtitleStyle}>
          Administra tu información, preferencias y configuraciones de seguridad.
        </p>
      </header>

      <section style={gridStyle}>
        {/* DATOS PERSONALES */}
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

            <label style={labelStyle}>Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={onChange}
              style={inputStyle}
            />

            <label style={labelStyle}>Teléfono</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={onChange}
              placeholder="Opcional"
              style={inputStyle}
            />

            <label style={labelStyle}>País</label>
            <input
              name="pais"
              value={form.pais}
              onChange={onChange}
              placeholder="Ej: Colombia"
              style={inputStyle}
            />

            <label style={labelStyle}>Zona horaria</label>
            <input
              name="timezone"
              value={form.timezone}
              onChange={onChange}
              placeholder="Ej: GMT-5"
              style={inputStyle}
            />

            <label style={labelStyle}>Correo registrado</label>
            <input
              value={form.correo}
              disabled
              style={{
                ...inputStyle,
                background: "#f1f5f9",
                color: "#555",
              }}
            />

            <label style={labelStyle}>descripcion</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={onChange}
              placeholder="Opcional"
              style={inputStyle}
            />

            <button type="submit" style={btnStyle} disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>

          {msg && <p style={msgStyle}>{msg}</p>}
        </div>

        {/* TARJETAS EXPANDIBLES */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Configuraciones avanzadas</h3>

          <div style={{ marginTop: "10px" }}>
            {ajustes.map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "12px",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <h4 style={{ margin: "0", color: "#0f172a" }}>
                    {item.titulo}
                  </h4>
                  <p style={{ margin: "0", color: "#475569" }}>
                    {item.descripcion}
                  </p>
                </button>

                <div
                  style={{
                    maxHeight: abierto === i ? "1200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease",
                    marginTop: abierto === i ? "10px" : "0",
                  }}
                >
                  {/* VIDEO */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginBottom: "15px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <iframe
                      src={item.video}
                      title={`video-${i}`}
                      style={{ width: "100%", height: "100%" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>

                  {/* PDF */}
                  <div
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <iframe
                      src={item.pdf}
                      title={`pdf-${i}`}
                      style={{ width: "100%", height: "100%" }}
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* === Estilos === */
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

const msgStyle = {
  marginTop: "12px",
  color: "#334155",
  fontWeight: 500,
};
