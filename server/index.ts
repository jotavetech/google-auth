import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.get("/", async (req, reply) => {
  reply.send({ status: "alive" });
});

app.get("/ping", async (req, reply) => {
  reply.send({ status: "pong" });
});

app.post("/api/auth/google", async (req, reply) => {
  const { credential } = req.body as any;

  // Recebe o token do Google e faz uma requisição na API do Google que retorna os dados do usuário (email, nome, foto).

  try {
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${credential.access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    // Faz o que quiser aqui
    // Salva no banco, procura, gera um JWT, etc.

    reply.send({ userData });
  } catch (err) {
    reply.status(401).send({ error: "Invalid credential" });
    return;
  }
});

app
  .listen({ port: 3000 })
  .then(() => {
    console.log("Server running on http://localhost:3000");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
