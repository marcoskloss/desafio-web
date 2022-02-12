import { NextFunction, Request, Response } from 'express';

export type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void> | (Response | void);
