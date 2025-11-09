import express from "express";
import cors from "cors";
import { conectarBD, sequelize } from "./database/db.js";import { obtenerMiUsuario } from "./controllers/UsuarioController.js";
import { obtenerMiPerfil, guardarMiPerfil } from "./controllers/PerfilController.js";

// Modelos
import { Usuario } from "./models/Usuario.js";
import { PerfilUsuario } from "./models/PerfilUsuario.js";

// Controladores (usuarios)
import {
  crearUsuario,
  loginUsuario,
  actualizarUsuario,
  obtenerUsuarios,
  eliminarUsuario,
} from "./controllers/UsuarioController.js";

// Controladores (perfil)
import {
  obtenerPerfilPorUsuario,
  guardarPerfilUsuario,
} from "./controllers/PerfilController.js";

// Middleware de auth
import { auth } from "./middlewares/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Relaciones
Usuario.hasOne(PerfilUsuario, { foreignKey: "id_usuario" });
PerfilUsuario.belongsTo(Usuario, { foreignKey: "id_usuario" });



// Healthcheck
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* ===========================
   Rutas públicas
   =========================== */
app.post("/api/usuarios", crearUsuario); // registro
app.post("/api/login", loginUsuario);    // login (entrega token)

/* ===========================
   Rutas protegidas (requieren JWT)
   =========================== */
// Usuarios
app.get("/api/usuarios", auth, obtenerUsuarios);
app.put("/api/usuarios/:id", auth, actualizarUsuario);
app.delete("/api/usuarios/:id", auth, eliminarUsuario);

// Perfil de usuario
app.get("/api/usuarios/:id/perfil", auth, obtenerPerfilPorUsuario);
app.put("/api/usuarios/:id/perfil", auth, guardarPerfilUsuario);

// Ruta de prueba del token
app.get("/api/yo", auth, (req, res) => {
  res.json({ mensaje: "Acceso permitido", user: req.user });
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
const iniciarServidor = async () => {
  try {
    await conectarBD();

    // Sincroniza los modelos con la base de datos (opcional)
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas con la BD");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ No se pudo iniciar el servidor:", err.message);
  }
};

iniciarServidor();

// ---- MI CUENTA (todas con auth) ----
app.get("/api/me", auth, obtenerMiUsuario);
app.get("/api/me/perfil", auth, obtenerMiPerfil);
app.put("/api/me/perfil", auth, guardarMiPerfil);