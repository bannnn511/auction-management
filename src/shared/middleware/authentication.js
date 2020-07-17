import { AppError } from '../../utils/appError';

// S1: get jwt
// S2: check jwt, if valid next()
// S3: if fail, send error

export async function authentication(req, res, next) {
  // JSON web token logic right here
  // req.currentUser = {};

  return next();
}
