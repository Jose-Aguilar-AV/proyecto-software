// controllers/PerfilController.js
import { PerfilUsuario } from "../models/PerfilUsuario.js";
import { Usuario } from "../models/Usuario.js";

// GET /api/usuarios/:id/perfil  — obtener perfil por usuario
export const obtenerPerfilPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const perfil = await PerfilUsuario.findOne({ where: { id_usuario: id } });
    if (!perfil) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }
    return res.json(perfil);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error en el servidor" });
  }
};

// PUT /api/usuarios/:id/perfil  — crear o actualizar perfil (upsert)
export const guardarPerfilUsuario = async (req, res) => {
  try {
    const { id } = req.params; // id del usuario
    const { saldo_inicial, perfil_inversion, telefono } = req.body || {};

    // Validaciones simples
    const permitidos = ["CONSERVADOR", "MODERADO", "AGRESIVO"];
    if (perfil_inversion && !permitidos.includes(perfil_inversion)) {
      return res.status(400).json({ mensaje: "perfil_inversion inválido" });
    }

    // Buscar si ya existe el perfil
    let perfil = await PerfilUsuario.findOne({ where: { id_usuario: id } });

    if (!perfil) {
      // Crear nuevo
      perfil = await PerfilUsuario.create({
        id_usuario: id,
        saldo_inicial: saldo_inicial ?? 0.0,
        perfil_inversion: perfil_inversion ?? "MODERADO",
        telefono: telefono ?? null,
      });
      return res.status(201).json({
        mensaje: "✅ Perfil creado",
        perfil,
      });
    }

    // Actualizar existente (solo campos enviados)
    if (saldo_inicial !== undefined) perfil.saldo_inicial = saldo_inicial;
    if (perfil_inversion) perfil.perfil_inversion = perfil_inversion;
    if (telefono !== undefined) perfil.telefono = telefono;

    await perfil.save();
    return res.json({
      mensaje: "✅ Perfil actualizado",
      perfil,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error en el servidor" });
  }
};




// ====== ME: obtener mi perfil ======
export const obtenerMiPerfil = async (req, res) => {
  try {
    const perfil = await PerfilUsuario.findOne({
      where: { id_usuario: req.user.id },
    });
    if (!perfil) return res.status(404).json({ mensaje: "Perfil no encontrado" });
    return res.json(perfil);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error del servidor" });
  }
};

// ====== ME: crear/actualizar mi perfil ======
export const guardarMiPerfil = async (req, res) => {
  try {
    const id_usuario = req.user.id;
    const payload = { ...req.body, id_usuario };

    const existe = await PerfilUsuario.findOne({ where: { id_usuario } });
    if (existe) {
      await existe.update(payload);
      return res.json({ mensaje: "✅ Perfil actualizado", perfil: existe });
    } else {
      const nuevo = await PerfilUsuario.create(payload);
      return res.status(201).json({ mensaje: "✅ Perfil creado", perfil: nuevo });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "❌ Error del servidor" });
  }
};