import express from 'express';
import cors from 'cors';
import * as http from 'http';

import routes from './routes';
import { prisma } from '@src/database';

export class Server {
  private app = express();
  private server?: http.Server;

  constructor(private port = 3333) {}

  public async init(): Promise<void> {
    await this.initDatabaseConnection();
    this.setupExpress();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info(`Server listening on port ${this.port}`);
    });
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' })); // todo: allow only UI origin

    this.app.use(routes);

    this.app.use((_, res) => res.status(404).end());
  }

  private async initDatabaseConnection(): Promise<void> {
    await prisma.$connect();
  }

  public async close(): Promise<void> {
    await prisma.$disconnect();

    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) reject();

          resolve(true);
        });
      });
    }
  }
}
