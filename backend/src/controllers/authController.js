const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Faltan campos obligatorios" });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ error: "El usuario ya existe" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ mensaje: "Usuario registrado", user: newUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const flagPassword = await bcrypt.compare(password, user.password);

  if (!flagPassword) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({
    mensaje: "Inicio de sesión exitoso",
    token,
  });
};

const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const { password, ...dataSinPassword } = user;
  res.status(200).json(dataSinPassword);
};

module.exports = {
  register,
  login,
  me,
};
