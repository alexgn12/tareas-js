// controllers/notasController.js
const { leerNotas, guardarNotas } = require("../utils/fsNotas");
//let notas = [];

const getAll = (req, res) => {
  const userId = req.user.id;
  const todasLasNotas = leerNotas();
  // Filtrar notas del usuario autenticado
  const notasDelUsuario = todasLasNotas.filter(
    (nota) => nota.userId === userId
  );

  res.status(200).json(notasDelUsuario);
};

const getById = (req, res) => {
  const id = parseInt(req.params.id); // siempre validar tipo

  const todasLasNotas = leerNotas();

  const nota = todasLasNotas.find((n) => n.id === id);

  if (!nota) {
    return res.status(404).json({ error: "Nota no encontrada" });
  }

  res.status(200).json(nota);
};

const create = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  // Validación manual básica
  if (!title || !content) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const todasLasNotas = leerNotas();

  const nuevaNota = {
    id: todasLasNotas.length
      ? Math.max(...todasLasNotas.map((n) => n.id)) + 1
      : 1,
    title,
    content,
    userId,
  };

  todasLasNotas.push(nuevaNota);
  guardarNotas(todasLasNotas);

  res.status(201).json(nuevaNota);
};

const deleteById = (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;

  const todasLasNotas = leerNotas();
  const index = todasLasNotas.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Nota no encontrada" });
  }

  const nota = todasLasNotas[index];

  if (nota.userId !== userId) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para eliminar esta nota" });
  }

  todasLasNotas.splice(index, 1);
  guardarNotas(todasLasNotas);

  res.status(204).send(); // No Content
};

const updateById = (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;
  const { title, content } = req.body;

  const todasLasNotas = leerNotas();
  const index = todasLasNotas.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Nota no encontrada" });
  }

  const nota = todasLasNotas[index];

  if (nota.userId !== userId) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para editar esta nota" });
  }

  // Solo actualizamos los campos proporcionados
  if (title !== undefined) nota.title = title;
  if (content !== undefined) nota.content = content;

  todasLasNotas[index] = nota;
  guardarNotas(todasLasNotas);

  res.status(200).json(nota);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
