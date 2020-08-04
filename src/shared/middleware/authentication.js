import { AppError } from '../../utils/appError';
import { getLoginUserById } from '../../api/Auth/business';
import { serializeBuyers } from '../../api/Buyers/buyers.serialize';
import { getToken, responseError } from '../helpers';

const jwt = require('jsonwebtoken');

export async function authentication(req, res, next) {
  // JSON web token logic right here
  try {
    console.log(req.header('Authorization'));
    const token = getToken(req);
    if (!token) {
      throw new AppError('You need to login', 401);
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Requested from Authorization ☔: ', data);
    const user = await getLoginUserById(data.id);
    if (!user) {
      throw new AppError('User does not exist', 400);
    }
    req.currentUser = serializeBuyers(user);
    next();
  } catch (error) {
    responseError(res, error);
  }
}
