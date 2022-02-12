export class AppError extends Error {
  constructor(msg: string, public status = 400) {
    super(msg);
  }
}
