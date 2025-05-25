const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { leerUsuarios, guardarUsuarios } = require("../utils/fsUsuarios");

// REGISTRO
const register = async (req, res) => {
  const { email, password } = req.body;

  const usuarios = leerUsuarios();

  // Verificar si ya existe
  if (usuarios.some((u) => u.email === email)) {
    return res.status(409).json({ error: "El email ya está registrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = {
    id: usuarios.length ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
    email,
    password: hashedPassword,
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json({
    mensaje: "Usuario registrado correctamente",
    datos: {
      id: nuevoUsuario.id,
      email: nuevoUsuario.email,
    },
  });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const usuarios = leerUsuarios();

  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({
    mensaje: "Inicio de sesión exitoso",
    token,
  });
};

module.exports = { register, login };
