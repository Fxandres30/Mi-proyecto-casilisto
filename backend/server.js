import express from "express";
import boletosRoutes from "./routes/boletos/route";

const app = express();
app.use(express.json());

// Rutas
app.use("/api/boletos", boletosRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
