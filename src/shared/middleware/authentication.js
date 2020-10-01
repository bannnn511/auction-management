import { AppError } from '../../utils/appError';
import { getLoginUserById } from '../../api/Auth/database';
import { serializeBuyers } from '../../api/Buyers/buyers.serialize';
import { getToken } from '../helpers';

const jwt = require('jsonwebtoken');

/**
 * Handle JSON web token.
 * Check header for 'Authorization' field.
 * Check token valid.
 * Check user id exists in database.
 *
 * @export
 * @param {Request} req
 * @param {*} res
 * @param {*} next
 */
export async function authentication(req, res, next) {
  try {
    if (!req.header('Authorization')) {
      throw new AppError('You need to login', 401, true);
    }
    console.log(req.header('Authorization'));
    const token = getToken(req);
    const data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          throw new AppError(err.message, 401, true);
        }
        return decoded;
      },
    );
    console.log('Requested from Authorization ☔: ', data);
    const user = await getLoginUserById(data.id);
    if (!user) {
      throw new AppError('User does not exist', 401, true);
    }
    req.currentUser = serializeBuyers(user);
    next();
  } catch (error) {
    next(error);
  }
}
