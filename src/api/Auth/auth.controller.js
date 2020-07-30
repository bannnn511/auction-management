import { AppError } from '../../utils/appError';
import { getLoginUserId, getPassOfUser, registerUser } from './business/index';
import { getToken, responseError, responseSuccess } from '../../shared/helpers';
import { getUserIdNoPass } from '../Buyers/business';
import { serializeUser } from './auth.serialize';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { client } = require('../../shared/helpers/redis');

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const passOfUser = await getPassOfUser(email);

    console.log(password, passOfUser.password);
    const match = await bcrypt.compare(password, passOfUser.password);
    if (match) {
      const user = await getLoginUserId(email, passOfUser.password);

      if (!user) {
        throw new AppError('Username or password does not exists.', 400);
      }

      console.log(serializeUser(user));

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      console.log(token);
      res.status(200).json({ token });
    }
    res.status(400).json({ error: 'Invalid input' });
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
      throw new AppError('User already exists', 204);
    }
    const buyer = await registerUser(body);
    if (!buyer) {
      throw new AppError('Create account fail', 400);
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
    const token = getToken(req);
    await client.rpush('token', token, (err, reply) => {
      console.log({ reply });
    });
    responseSuccess(res, req.currentUser);
  } catch (error) {
    responseError(res, error);
  }
}
