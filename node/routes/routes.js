import express from "express";
import { registrar, login } from "../controllers/UserController.js";
import {
  crearPortafolio,
  listarPortafolios,
} from "../controllers/PortafolioController.js";
import {
  registrarTransaccion,
  listarTransacciones,
} from "../controllers/TransaccionController.js";

const router = express.Router();

router.post("/register", registrar);
router.post("/login", login);

router.post("/portafolios", crearPortafolio);
router.get("/portafolios", listarPortafolios);

router.post("/transacciones", registrarTransaccion);
router.get("/transacciones", listarTransacciones);

export default router;
