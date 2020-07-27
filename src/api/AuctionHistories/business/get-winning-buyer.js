const db = require('../../../../models');

export async function getWinningBuyerIdFromHistory(auctionId) {
  try {
    const winner = db.AuctionHistories.findAll({
      attributes: [db.sequelize.fn('MAX', db.sequelize.col('Price'))],
      where: {
        auctionId,
      },
    });
    return winner;
  } catch (error) {
    console.log(error);
    return null;
  }
}
