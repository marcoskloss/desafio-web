/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as http from 'http';

import routes from './routes';
import { prisma } from '@src/database';
import { AppError } from '@src/errors/app-error';

export class Server {
  private app = express();
  private server?: http.Server;

  constructor(private port = 3333) {}

  public async init(): Promise<void> {
    this.setupExpress();
    await this.initDatabaseConnection();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info(`Server listening on port ${this.port}`);
    });
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' })); // todo: allow only UI origin

    this.app.use((req, _, next) => {
      console.log(`{${req.method}} - ${req.path}`);
      next();
    });

    this.app.use(routes);
    this.app.use((_, res) => res.status(404).end());

    this.app.use(this.errorHandler);
  }

  private async initDatabaseConnection(): Promise<void> {
    await prisma.$connect();
  }

  private errorHandler(
    error: Error,
    req: Request,
    res: Response,
    _: NextFunction
  ): Response {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message });
    }

    console.log(`!ERROR! {${req.method}} - ${req.url} \n`, error);
    return res.status(500).json({
      error:
        'Um erro inesperado aconteceu, mas fique tranquilo que isso não é sua culpa.',
    });
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
