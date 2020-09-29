const db = require('../../../../models');

export async function getUserWinningAuction(id) {
  return db.sequelize.query(
    `select * from auctionDB.auction_managements as auction, auctionDB.buyers as buyers where buyers.id= '${id}' and buyers.id = auction.buyer_id`,
    {
      raw: true,
      type: db.sequelize.QueryTypes.SELECT,
    },
  );
}
