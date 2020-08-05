import { UserStatus, UserType } from '../../../shared/helpers/constant';
import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

export function getBuyers(page, pagesize) {
  const { Op } = db.Sequelize;
  const { offset, limit } = pagination(page, pagesize);
  console.log({ offset, limit });
  try {
    const buyers = db.Buyers.findAll({
      where: {
        status: UserStatus.ACTIVE,
        type: {
          [Op.not]: UserType.ADMIN,
        },
      },
      offset,
      limit,
    });
    return buyers;
  } catch (error) {
    console.log(error);
    return null;
  }
}
