import { MiddlewareHandler } from '@src/types/middleware';

export const userSchemaValidator: MiddlewareHandler = (req, res, next) => {
  const required = ['name', 'code', 'birth_date'];
  const { body } = req;

  const bodyKeys = Object.keys(body);
  
  const missingFields = required
    .filter(field => !bodyKeys.includes(field));

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: missingFields.map((field) => `${field} is required!`),
    });
  }

  return next();
};
