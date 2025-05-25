const { body, validationResult } = require("express-validator");

const validarNota = [
  body("title")
    .exists()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),

  body("content")
    .exists()
    .withMessage("El contenido es obligatorio")
    .isLength({ max: 200 })
    .withMessage("El contenido no puede superar los 200 caracteres"),

  // Middleware final que verifica si hay errores
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

module.exports = validarNota;
