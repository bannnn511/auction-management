// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('🔥🔥🔥 Error handler', err);

  if (err.isAppError) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      error: err,
      // stack: err.stack,
    });
  }

  return res.status(err.status || 500).json({
    message: 'Something went wrong...',
  });
}
