import { UserStatus, UserType } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getBuyers() {
  const { Op } = db.Sequelize;
  try {
    const buyers = db.Buyers.findAll({
      where: {
        status: UserStatus.ACTIVE,
        type: {
          [Op.not]: UserType.ADMIN,
        },
      },
    });
    return buyers;
  } catch (error) {
    console.log(error);
    return null;
  }
}
