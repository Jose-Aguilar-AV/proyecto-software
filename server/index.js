import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Alpaca from "@alpacahq/alpaca-trade-api";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const alpaca = new Alpaca({
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  paper: true,
  usePolygon: false
});

app.get("/api/historial", async (req, res) => {
  try {
    const symbol = req.query.symbol || "AAPL";

    // Consultar barras diarias
    const bars = await alpaca.getBarsV2(
      symbol,
      {
        start: "2024-01-01",
        end: "2024-12-31",
        timeframe: "1Day",
      }
    );

    // Convertir el iterable a array
    const data = [];
    for await (let b of bars) {
      data.push({
        t: b.Timestamp,
        o: b.OpenPrice,
        h: b.HighPrice,
        l: b.LowPrice,
        c: b.ClosePrice,
        v: b.Volume
      });
    }

    res.json(data);

  } catch (err) {
    console.error("Error Alpaca:", err);
    res.status(500).json({ error: "Error obteniendo historial desde Alpaca" });
  }
});

app.listen(4002, () => console.log("Servidor corriendo en http://localhost:4002"));
