const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("Falta MONGO_URI en el archivo .env");
    }

    await mongoose.connect(uri);

    console.log("✅ Conexión a MongoDB establecida");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
