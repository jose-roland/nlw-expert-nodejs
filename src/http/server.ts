import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { createPoll } from "./routes/create-poll";
import { findPollById } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";

const app = fastify();
const port = 3333;

app.register(fastifyCookie, {
  secret: "laksdjfakQJEKFDJKouqowieOrvcnxzbv",
  hook: "onRequest",
});

app.register(createPoll);
app.register(findPollById);
app.register(voteOnPoll);

app.listen({ port: port }).then(() => {
  console.log(`Application is running at http://localhost:${port}`);
});
