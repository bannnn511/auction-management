import { AppError } from '../../utils/appError';

const jwt = require('jsonwebtoken');

export async function authentication(req, res, next) {
  // JSON web token logic right here
  const token = req.header.authorization;
  if (!token) {
    throw new AppError('Header need authorization', 400);
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log('error');
  }
  return next();
}
