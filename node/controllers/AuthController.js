import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios" });
    }

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasena_hash);
    if (!coincide) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // eliminar hash antes de responder
    const { contrasena_hash, ...datosSeguros } = usuario.get({ plain: true });

    return res.json({
      mensaje: "✅ Inicio de sesión exitoso",
      usuario: datosSeguros
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "❌ Error en el servidor" });
  }
};
