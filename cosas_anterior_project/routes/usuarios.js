const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/usuariosController");
const validarRegistro = require("../middlewares/validateUsuario");
const validarLogin = require("../middlewares/validateLogin");

router.post("/", validarRegistro, register);
router.post("/login", validarLogin, login);

module.exports = router;
