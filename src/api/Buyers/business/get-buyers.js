import { Buyers, Sequelize } from '../../../../models/index';
import { UserStatus, UserType } from '../../../shared/helpers/constant';

export function getBuyers() {
  const { Op } = Sequelize;
  try {
    const buyers = Buyers.findAll({
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
