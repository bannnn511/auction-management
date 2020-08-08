import { getToken } from '../../../shared/helpers';
import { client } from '../../../shared/helpers/redis';
import AppError from '../../../utils/appError';

export async function blacklistToken(req) {
  try {
    // Delete Token here
    const token = getToken(req);
    await client.rpush('token', token, (err, reply) => {
      console.log({ reply });
    });
  } catch (error) {
    throw new AppError('Cannot blacklist token', 500);
  }
}
