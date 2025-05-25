const fs = require("fs");
const path = require("path");

const rutaArchivo = path.join(__dirname, "../data/usuarios.json");

const leerUsuarios = () => {
  const data = fs.readFileSync(rutaArchivo, "utf8");
  return JSON.parse(data);
};

const guardarUsuarios = (usuarios) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(usuarios, null, 2), "utf8");
};

module.exports = {
  leerUsuarios,
  guardarUsuarios,
};
