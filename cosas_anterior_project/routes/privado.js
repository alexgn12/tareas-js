const express = require("express");
const router = express.Router();
const autenticarToken = require("../middlewares/auth");

router.get("/", autenticarToken, (req, res) => {
  res.json({ mensaje: `Hola ${req.user.email}, accediste correctamente` });
});

module.exports = router;
