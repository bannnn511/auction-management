// S1: get email pass
// S2: if success => send jwt to client
// S3: if fail=> send error

import { AppError } from '../../utils/appError';
import { getLoginUser, registerUser } from './business';

const jwt = require('jsonwebtoken');

export async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await getLoginUser(email, password);

  if (!user) {
    next(new AppError('Username or password does not exists.', 400));
  }

  console.log('🔥🔥🔥', user);
  const token = jwt.sign({ data: req.body.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });

  console.log(token);
  res.status(200).json({ token: token });
}

export async function register(req, res, next) {
  const body = req.body;

  const buyer = await registerUser(body);

  if (!buyer) {
    next(new AppError('Create account fail', 400));
  }

  console.log('🔥🔥🔥', user);
  res.status(200).json({ user: buyer });
}
