import { Sequelize } from '../../../../models';

const db = require('../../../../models');

export async function getAllBuyerInAuction(id) {
  try {
    const buyers = await db.AuctionHistories.findAll({
      where: {
        auctionId: id,
      },
      attributes: [Sequelize.literal('DISTINCT `user_id`'), 'userId'],
    });
    return buyers;
  } catch (error) {
    console.log(error);
    return null;
  }
}
