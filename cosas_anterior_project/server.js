require("dotenv").config();
const express = require("express");
const app = express();

// Importaciones
//const logger = require("./middlewares/logger");
const notasRouter = require("./routes/notas");
const usuariosRouter = require("./routes/usuarios");

// Middleware global
app.use(express.json());
//app.use(logger);

// Rutas
const privadoRouter = require("./routes/privado");
app.use("/privado", privadoRouter);

app.use("/notas", notasRouter); // ¡tus rutas de notas!
app.use("/usuarios", usuariosRouter);

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("API de Notas Seguras funcionando");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
