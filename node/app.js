import express from "express";
import cors from "cors";
import db from "./database/db.js";
import router from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

try {
  await db.authenticate();
  console.log("✅ Conexión exitosa a MySQL");
} catch (error) {
  console.log("❌ Error de conexión: ", error);
}

import "./models/UserModel.js";
import "./models/PortafolioModel.js";
import "./models/TransaccionModel.js";
import "./models/PrecioModel.js";
import "./models/ContenidoModel.js";

try {
  await db.sync({ alter: true }); // crea o actualiza las tablas según los modelos
  console.log("🗄️ Tablas sincronizadas correctamente");
} catch (error) {
  console.log("⚠️ Error al sincronizar tablas:", error);
}


app.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000/");
});
