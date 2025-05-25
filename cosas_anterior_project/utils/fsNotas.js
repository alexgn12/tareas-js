const fs = require("fs");
const path = require("path");

const rutaArchivo = path.join(__dirname, "../data/notas.json");

const leerNotas = () => {
  const data = fs.readFileSync(rutaArchivo, "utf8");
  return JSON.parse(data);
};

const guardarNotas = (notas) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(notas, null, 2), "utf8");
};

module.exports = {
  leerNotas,
  guardarNotas,
};
