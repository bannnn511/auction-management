import { AppError } from '../../utils/appError';
import { getLoginUserId, registerUser } from './business/index';

const jwt = require('jsonwebtoken');

export async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await getLoginUserId(email, password);

  if (!user) {
    next(new AppError('Username or password does not exists.', 400));
  }

  console.log('🔥🔥🔥', user);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
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

export async function logout(req, res, next) {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
