import { getLoginUserId, getPassOfUser } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError, responseSuccess } from '../../../shared/helpers';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export async function loginBusiness(req, res) {
  try {
    const { email, password } = req.body;

    const passOfUser = await getPassOfUser(email);
    const match = await bcrypt.compare(password, passOfUser);
    if (match) {
      const user = await getLoginUserId(email, passOfUser);

      if (!user) {
        throw new AppError('Username or password does not exists.', 400);
      }
      const token = jwt.sign(
        { id: user.id, permissions: user.type },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      return token;
    }
    responseSuccess(res, { error: 'Invalid Input' }, 401);
    return null;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
