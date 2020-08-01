import { getToken, responseError } from '../helpers';

const { client } = require('../helpers/redis');

export function redisValidation(req, res, next) {
  const token = getToken(req);
  try {
    client.lrange('token', 0, 99999999, (err, reply) => {
      if (reply.indexOf(token) > -1) {
        responseError(res, 'Invalid Token');
      } else {
        next();
      }
    });
  } catch (error) {
    responseError(res, error);
  }
}
