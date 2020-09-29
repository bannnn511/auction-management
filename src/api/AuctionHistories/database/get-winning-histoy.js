const db = require('../../../../models');

export async function getWinningHistoryFromAuctionWithAuctionId(auctionId) {
  return db.AuctionHistories.findOne({
    include: [
      {
        model: db.AuctionManagements,
        as: 'auction_managements',
      },
    ],
    attributes: [
      [db.sequelize.fn('MAX', db.sequelize.col('price')), 'price'],
      ['user_id', 'userId'],
    ],
    where: {
      auctionId,
    },
    group: ['user_id', 'auction_id'],
  });
}
