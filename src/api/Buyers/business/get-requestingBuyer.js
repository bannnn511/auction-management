import { Buyers, Sequelize } from '../../../../models/index';
import { UserType, UserStatus } from '../../../shared/helpers/constant';

export function getRequestingBuyers() {
  const { Op } = Sequelize;
  try {
    const buyer = Buyers.findAll({
      attributes: ['id', 'email', 'type', 'status', 'address', 'fullname'],
      where: {
        isSeller: true,
        status: UserStatus.ACTIVE,
        type: { [Op.not]: UserType.ADMIN },
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
