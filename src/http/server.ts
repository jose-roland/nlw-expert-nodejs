import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyWebsocket from '@fastify/websocket';
import { createPoll } from './routes/create-poll';
import { findPollById } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollResult } from './ws/poll-result';

const app = fastify();
const port = 3333;

app.register(fastifyCookie, {
  secret: 'laksdjfakQJEKFDJKouqowieOrvcnxzbv',
  hook: 'onRequest',
});

app.register(createPoll);
app.register(fastifyWebsocket);
app.register(findPollById);
app.register(voteOnPoll);

app.register(pollResult);

app.listen({ port: port }).then(() => {
  console.log(`Application is running at http://localhost:${port}`);
});
