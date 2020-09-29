import { UserStatus, UserType } from '../../../shared/helpers/constant';
import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

export function getBuyers(page, pagesize) {
  const { Op } = db.Sequelize;
  const { offset, limit } = pagination(page, pagesize);

  return db.Buyers.findAll({
    where: {
      status: UserStatus.ACTIVE,
      type: {
        [Op.not]: UserType.ADMIN,
      },
    },
    offset,
    limit,
  });
}
