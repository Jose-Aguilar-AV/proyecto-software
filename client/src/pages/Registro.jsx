import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";

export default function Registro() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmar: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (form.contrasena !== form.confirmar) {
      setMsg("❌ Las contraseñas no coinciden");
      return;
    }
    try {
      setLoading(true);
      // 1) Crear usuario
      await api.post("/register", {
        nombre: form.nombre.trim(),
        correo: form.correo.trim().toLowerCase(),
        contrasena: form.contrasena.trim(),
      });

      // 2) Login automático
      const { data } = await api.post("/login", {
        correo: form.correo.trim().toLowerCase(),
        contrasena: form.contrasena.trim(),
      });
      localStorage.setItem("token", data.token || "");
      localStorage.setItem("user", JSON.stringify(data.usuario || {}));

      setMsg("✅ Registro y login exitosos");
      nav("/login"); // 🔁 Ir al login después de registrarse
    } catch (err) {
      const m =
        err?.response?.data?.mensaje ||
        err?.response?.data?.error ||
        "❌ No se pudo registrar el usuario";
      setMsg(m);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "40px auto" }}>
      <h2>Crear cuenta</h2>
      <form onSubmit={onSubmit}>
        <label>Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={form.contrasena}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label>Confirmar contraseña</label>
        <input
          type="password"
          name="confirmar"
          value={form.confirmar}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 12 }}
        />

        <button disabled={loading} type="submit">
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>

      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}

      <p style={{ marginTop: 12 }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}
