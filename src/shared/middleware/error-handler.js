export function errorHandler(err, req, res, next) {
  if (err.isAppError) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  console.log('🔥🔥🔥', err);
  res.status(500).json({
    message: 'Something went wrong...',
  });
}
