require("dotenv").config(); // Carga .env
const app = require("./app");
const conectarDB = require("./database");

const PORT = process.env.PORT || 3000;

const start = async () => {
  await conectarDB(); // Espera conexión antes de continuar

  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
  });
};

start();
