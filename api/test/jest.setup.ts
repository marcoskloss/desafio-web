import { Server } from '@src/server';

let server: Server;

beforeAll(async () => {
  server = new Server(Number(process.env.PORT));

  await server.init();
  server.start();
});

afterAll(async () => {
  await server.close();
});
