import { AppError } from '../../utils/appError';
import { getLoginUserId, registerUser } from './business/index';
import { responseError } from '../../shared/helpers';
import { getUserIdNoPass } from '../Buyers/business';
import { serializeUser } from './auth.serialize';

const jwt = require('jsonwebtoken');

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await getLoginUserId(email, password);

    if (!user) {
      next(new AppError('Username or password does not exists.', 400));
    }

    console.log('🔥🔥🔥', serializeUser(user));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    responseError(res, error);
  }
}

export async function register(req, res, next) {
  try {
    const { body } = req;
    console.log({ myuser: body });

    const checkUser = await getUserIdNoPass(body);
    if (checkUser) {
      res.status(400).send('User already exists');
    }
    const buyer = await registerUser(body);
    if (!buyer) {
      next(new AppError('Create account fail', 400));
    }
    const buyerData = serializeUser(buyer);
    console.log(buyerData);

    res.status(200).json({ data: buyerData });
  } catch (error) {
    responseError(res, error);
  }
}

export async function logout(req, res) {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    responseError(res, error);
  }
}
