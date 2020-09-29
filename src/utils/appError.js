class AppError extends Error {
  constructor(message, statusCode, isAppError) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isAppError = isAppError;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
