export function errorHandler(err, req, res) {
  if (err.isAppError) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  console.log('🔥🔥🔥 Error', err.message);
  return res.status(400).json({
    message: 'Something went wrong...',
  });
}
