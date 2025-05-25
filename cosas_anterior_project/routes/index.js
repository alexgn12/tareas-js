const express = require("express");
const router = express.Router();

// Importa el controlador
const { home } = require("../controllers/mainController");

// Ruta GET principal
router.get("/", home);

module.exports = router;
