const db = require('../../../../models');

export async function getWinningHistoryFromAuctionWithAuctionId(auctionId) {
  try {
    return db.AuctionHistories.findOne({
      include: [
        {
          model: db.AuctionManagements,
          as: 'auction_managements',
        },
      ],
      attributes: [
        [db.sequelize.fn('MAX', db.sequelize.col('price')), 'price'],
      ],
      where: {
        auctionId,
      },
      group: ['user_id', 'auction_id'],
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
