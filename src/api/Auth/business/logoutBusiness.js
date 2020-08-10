import { getToken, responseError } from '../../../shared/helpers';

const { client } = require('../../../shared/helpers/redis');

export async function logoutBusiness(req, res) {
  try {
    const token = getToken(req);
    await client.rpush('token', token, (err, reply) => {
      console.log({ reply });
    });
    return req.currentUser;
  } catch (error) {
    responseError(res, error);
  }
}
