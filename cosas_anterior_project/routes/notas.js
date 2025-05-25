const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/notasController");
const validarNota = require("../middlewares/validateNota");
const autenticarToken = require("../middlewares/auth");

router.get("/", autenticarToken, ctrl.getAll);
router.get("/:id", ctrl.getById);

// Middleware de validación en esta ruta
router.post("/", autenticarToken, validarNota, ctrl.create);

router.delete("/:id", autenticarToken, ctrl.deleteById);

router.patch("/:id", autenticarToken, ctrl.updateById);

module.exports = router;
