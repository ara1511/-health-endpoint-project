import express from "express";
import healthRoutes from "./routes/health.js";

const app = express();

// CORS básico
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rutas
app.use("/", healthRoutes);

// Ruta por defecto
app.get("/", (req, res) => {
  res.json({
    message: "Servicio funcionando correctamente",
    endpoints: {
      health: "GET /health"
    }
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`💚 Health check disponible en: http://localhost:${PORT}/health`);
  });
}

export default app;
