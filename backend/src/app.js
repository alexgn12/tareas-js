const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const taskRouter = require("./routes/taskRoutes");
const authRouter = require("./routes/authRoutes");
const autenticarToken = require("./middlewares/authMiddleware");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/tasks", autenticarToken, taskRouter);
app.use("/users", authRouter);

module.exports = app;
