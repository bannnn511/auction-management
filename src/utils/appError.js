class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isAppError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
