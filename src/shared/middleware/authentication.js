export function authorized(req, res, next) {
  // JSON web token logic right here
  req.currentUser = {};

  return next();
}
