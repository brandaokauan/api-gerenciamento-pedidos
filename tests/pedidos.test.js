
const request = require("supertest");
const app = require("../app");

describe("API de Gerenciamento de Pedidos", () => {

  test("Deve cadastrar um pedido válido - HTTP 201", async () => {
    const resposta = await request(app)
      .post("/pedidos")
      .send({
        cliente: "Maria Oliveira",
        tipo: "retirada",
        valor: 150,
        prioridade: "alta"
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.cliente).toBe("Maria Oliveira");
    expect(resposta.body.status).toBe("recebido");
    expect(resposta.body).toHaveProperty("id");
  });

  test("Deve rejeitar cliente vazio - HTTP 400", async () => {
    const resposta = await request(app)
      .post("/pedidos")
      .send({
        cliente: "   ",
        tipo: "entrega",
        valor: 100,
        prioridade: "normal"
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty("erro");
  });

  test("Deve listar os pedidos - HTTP 200", async () => {
    const resposta = await request(app).get("/pedidos");

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test("Deve retornar 404 para pedido inexistente", async () => {
    const resposta = await request(app).get("/pedidos/999");

    expect(resposta.status).toBe(404);
    expect(resposta.body).toHaveProperty("erro");
  });

  test("Deve atualizar o status de um pedido - HTTP 200", async () => {
    const resposta = await request(app)
      .patch("/pedidos/1/status")
      .send({ status: "em preparo" });

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe("em preparo");
  });

  test("Deve rejeitar status inválido - HTTP 400", async () => {
    const resposta = await request(app)
      .patch("/pedidos/1/status")
      .send({ status: "finalizado" });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty("erro");
  });

});
