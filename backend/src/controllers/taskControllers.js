const Task = require("../models/Task");

const getAll = async (req, res) => {
  const userId = req.user.id;
  const task = await Task.find({ user: userId });
  res.status(200).json(task);
};

const getById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(403).json({ error: "No tienes acceso a esta tarea" });
  }

  res.status(200).json(task);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ error: "Faltan el titulo." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Token invalido." });
  }
  const newTask = new Task({ title, description, user: userId });

  await newTask.save();

  res.status(201).json(newTask);
};

const deleteById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (task.user.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para eliminar esta tarea" });
  }
  await task.deleteOne();

  res.status(204).send(); // No content
};

const updateById = async (req, res) => {
  const { title, description, status, dueDate, createdAt } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (task.user.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para eliminar esta tarea" });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (createdAt !== undefined) task.createdAt = createdAt;

  await task.save();

  res.status(200).json(task);
};
module.exports = {
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
};
