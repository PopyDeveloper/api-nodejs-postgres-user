import Fastify from "fastify";
import { DataBasePostgres } from "./database-postgres.js";

const database = new DataBasePostgres();

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  const users = await database.list();

  return reply.send(users);
});

fastify.post("/addUser", async (request, reply) => {
  const { name, age } = request.body;

  await database.addUser({
    name,
    age,
  });

  return reply.status(201).send();
});

fastify.put("/updateUser/:id", async (request, reply) => {
  const idUser = request.params.id;
  const { name, age } = request.body;

  await database.updateUser(idUser, {
    name,
    age,
  });

  return reply.status(204).send();
});

fastify.delete("/deleteUser/:id", async (request, reply) => {
  const { id } = request.params;

  await database.deleteUser(id);

  reply.status(201).send();
});

try {
  await fastify.listen({ port: process.env.PORT ?? 3333 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
