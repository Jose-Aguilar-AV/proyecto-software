import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import { PerfilUsuario } from "../models/PerfilUsuario.js";

/* =========================================
   GET /api/usuarios
   ========================================= */
export const obtenerUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: PerfilUsuario, required: false }],
      order: [["id", "ASC"]],
    });
    return res.json(usuarios);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error del servidor" });
  }
};

/* =========================================
   POST /api/usuarios  (registro)
   ========================================= */
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(contrasena, 10);
    const usuario = await Usuario.create({
      nombre,
      correo,
      contrasena_hash: hash,
    });

    const { contrasena_hash, ...usuarioSeguro } = usuario.get({ plain: true });

    return res.status(201).json({
      mensaje: "✅ Usuario creado correctamente (cifrado)",
      usuario: usuarioSeguro,
    });
 } catch (e) {
  console.error(e);
  if (e.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ mensaje: "El correo ya está registrado" });
  }
  return res.status(500).json({ mensaje: "❌ Error del servidor" });
}
};


/* =========================================
   POST /api/login  (emite JWT)
   ========================================= */
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(contrasena, usuario.contrasena_hash);
    if (!match) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    // Nunca metas el hash en el token
    const payload = { id: usuario.id, correo: usuario.correo };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || "2h",
    });

    const { contrasena_hash, ...usuarioSeguro } = usuario.get({ plain: true });

    return res.json({
      mensaje: "✅ Inicio de sesión exitoso",
      token,
      usuario: usuarioSeguro,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error del servidor" });
  }
};

/* =========================================
   PUT /api/usuarios/:id
   ========================================= */
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mensaje: "No se enviaron datos para actualizar" });
    }

    const { nombre, estado, contrasena } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (nombre) usuario.nombre = nombre;
    if (estado) usuario.estado = estado;
    if (contrasena) {
      usuario.contrasena_hash = await bcrypt.hash(contrasena, 10);
    }

    await usuario.save();
    const { contrasena_hash, ...usuarioSeguro } = usuario.get({ plain: true });

    return res.json({ mensaje: "✅ Usuario actualizado", usuario: usuarioSeguro });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error en el servidor" });
  }
};

/* =========================================
   DELETE /api/usuarios/:id
   ========================================= */
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    await usuario.destroy(); // si tu FK está en CASCADE, borra su perfil también
    return res.json({ mensaje: "🗑️ Usuario eliminado correctamente", id: Number(id) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error en el servidor" });
  }
};


// ====== ME: devolver el usuario del token ======
export const obtenerMiUsuario = async (req, res) => {
  try {
    // req.user lo puso el middleware auth (viene del token)
    const usuario = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ["contrasena_hash"] },
    });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    return res.json(usuario);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error del servidor" });
  }
};
