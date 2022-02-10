import './config';
import 'express-async-errors';

import { Server } from './server';

async function start(): Promise<void> {
  const server = new Server(Number(process.env.PORT));
  await server.init();
  server.start();
}

start();
