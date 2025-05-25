const jwt = require("jsonwebtoken");

const autenticarToken = (req, res, next) => {
  // Extraer el header Authorization
  const authHeader = req.headers["authorization"];

  // El token debe estar en formato: Bearer token.aqui
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    // Inyectar el usuario en la petición
    req.user = payload;
    next();
  });
};

module.exports = autenticarToken;
