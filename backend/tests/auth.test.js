const request = require("supertest");
const app = require("../src/app");
const fs = require("fs");
const path = require("path");

// ⚠️ Ruta real a users.json
const rutaUsuarios = path.join(__dirname, "../data/users.json");

// beforeEach(() => {
//   // ✅ Antes de cada test, dejamos el archivo limpio con un usuario de prueba
//   fs.writeFileSync(
//     rutaUsuarios,
//     JSON.stringify([
//       {
//         id: 1,
//         username: "usuario",
//         password:
//           "$2b$10$e2HTxqC6DTi4h9X3e3I1eO7.PwWf68xya1EvKTRB9NNDrDwRvC1CO", // '123456' hasheado
//       },
//     ])
//   );
// });
// describe("🧪 Auth API", () => {
//   test("Debería registrar un nuevo usuario", async () => {
//     const res = await request(app)
//       .post("/users/register")
//       .send({ username: "nuevo", password: "abc123" });

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("mensaje");
//   });
//   test("Debe hacer login correctamente con usuario registrado", async () => {
//     const res = await request(app)
//       .post("/users/login")
//       .send({ username: "nuevo", password: "abc123" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("token");
//   });
//   test("No debe hacer login con contraseña incorrecta", async () => {
//     const res = await request(app)
//       .post("/users/login")
//       .send({ username: "usuario", password: "incorrecta" });

//     expect(res.statusCode).toBe(401);
//   });
// });
it("should login a user and return a token", async () => {
  const res = await request(app).post("/users/login").send({
    username: "Test User",
    password: "password123",
  });

  expect(res.statusCode).toBe(200);
});
