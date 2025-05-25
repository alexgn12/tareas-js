const request = require("supertest");
const app = require("../src/app");
const fs = require("fs");
const path = require("path");

const rutaTareas = path.join(__dirname, "../data/tasks.json");
const rutaUsuarios = path.join(__dirname, "../data/users.json");

let token;

beforeEach(async () => {
  // ✅ Usuario fijo con id: 1
  fs.writeFileSync(
    rutaUsuarios,
    JSON.stringify([
      {
        id: 1,
        username: "ana",
        password:
          "$2b$10$e2HTxqC6DTi4h9X3e3I1eO7.PwWf68xya1EvKTRB9NNDrDwRvC1CO", // 123456
      },
    ])
  );

  // ✅ Limpia las tareas
  fs.writeFileSync(rutaTareas, JSON.stringify([]));

  // ✅ Login y obtener token para pruebas
  const res = await request(app)
    .post("/users/login")
    .send({ username: "ana", password: "123456" });

  token = res.body.token;
});

describe("🧪 Tasks API", () => {
  test("Debe crear una tarea con token", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Estudiar", description: "Backend con Express" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Estudiar");
  });

  test("Debe rechazar creación sin token", async () => {
    const res = await request(app).post("/tasks").send({ title: "Sin token" });

    expect(res.statusCode).toBe(401);
  });

  test("Debe listar solo tareas del usuario", async () => {
    // Crear una tarea para el usuario
    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Tarea de Ana", description: "Privada" });

    // Obtener tareas del usuario
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Tarea de Ana");
  });
});
