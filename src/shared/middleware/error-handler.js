export function errorHandler(err, req, res) {
  if (err.isAppError) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  console.log('🔥🔥🔥 Error handler: ', err);
  return res.status(err.status || 500).json({
    message: 'Something went wrong...',
  });
}
