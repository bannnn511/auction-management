import { AppError } from '../../utils/appError';
import { getLoginUserById } from '../../api/Auth/database';
import { serializeBuyers } from '../../api/Buyers/buyers.serialize';
import { getToken } from '../helpers';

const jwt = require('jsonwebtoken');

export async function authentication(req, res, next) {
  // JSON web token logic right here
  try {
    if (!req.header('Authorization')) {
      throw new AppError('You need to login', 401);
    }
    console.log(req.header('Authorization'));
    const token = getToken(req);
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Requested from Authorization ☔: ', data);
    const user = await getLoginUserById(data.id);
    if (!user) {
      throw new AppError('User does not exist', 400);
    }
    req.currentUser = serializeBuyers(user);
    next();
  } catch (error) {
    next(error);
  }
}
