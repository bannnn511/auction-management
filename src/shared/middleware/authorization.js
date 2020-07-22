import { AppError } from '../../utils/appError';
import { getLoginUserById } from '../../api/Auth/business';
import { serializeBuyers } from '../../api/Buyers/buyers.serialize';

const jwt = require('jsonwebtoken');

export async function authorization(req, res, next) {
  // JSON web token logic right here

  try {
    const token = req
      .header('Authorization')
      .replace('Bearer', '')
      .replace(/\s/g, '');
    console.log('token: ', token);
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Requested from Authorization ☔: ', data);

    const user = await getLoginUserById(data.id);
    if (!user) {
      next(new AppError('User does not exist', 400));
    }

    req.currentUser = serializeBuyers(user);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
