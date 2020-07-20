import { Buyers, Sequelize } from '../../../../models/index';

export function getBuyers() {
  const Op = Sequelize.Op;
  return Buyers.findAll({
    where: {
      status: 'active',
      type: {
        [Op.not]: 'admin',
      },
    },
  });
}
