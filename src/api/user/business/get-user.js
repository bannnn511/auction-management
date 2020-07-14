import { User } from '../../../../models';

export function getUserByEmail(email) {
  // Sequelize query
  return User.findOne({ where: { email } });
}
