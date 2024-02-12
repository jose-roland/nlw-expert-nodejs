import { FastifyInstance } from 'fastify';
import { vote } from '../../utils/vote.pub-sub';
import z from 'zod';

export async function pollResult(app: FastifyInstance) {
  app.get(
    '/poll/:pollId/result',
    { websocket: true },
    (connection, request) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = getPollParams.parse(request.params);

      vote.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
}
