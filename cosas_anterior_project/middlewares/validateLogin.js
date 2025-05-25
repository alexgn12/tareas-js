const { body, validationResult } = require("express-validator");

const validarLogin = [
  body("email")
    .exists()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  body("password").exists().withMessage("La contraseña es obligatoria"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

module.exports = validarLogin;
