/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { userSchemaValidator } from '../middleware/user-schema-validator';

describe('user-schema-validator tests', () => {
  it('should call next if the provided schema is valid', () => {
    const validSchema = {
      name: 'username',
      code: 1,
      birth_date: new Date(),
    };

    const req = { body: validSchema } as Request;
    const res = {} as Response;
    const next = jest.fn();

    userSchemaValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should call response with status 400 if the provided schema is invalid', () => {
    const invalidSchema = {};

    const req = { body: invalidSchema } as Request;
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const next = (() => {}) as NextFunction;

    userSchemaValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.arrayContaining([
          expect.stringContaining('name'),
          expect.stringContaining('code'),
          expect.stringContaining('birth_date'),
        ]),
      })
    );
  });
});
