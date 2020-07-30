import { AppError } from '../../utils/appError';
import { getToken, responseError } from '../helpers';

const { client } = require('../helpers/redis');

export async function redisValidation(req, res, next) {
  try {
    const token = getToken(req);
    console.log('======================', token);
    await client.lrange('token', 0, 99999999, (err, reply) => {
      try {
        if (reply.indexOf(token) > -1) {
          throw new AppError('Invalid Token', 400);
        }
      } catch (error) {
        responseError(res, error);
      }
    });
    next();
  } catch (error) {
    responseError(res, error);
  }
}
