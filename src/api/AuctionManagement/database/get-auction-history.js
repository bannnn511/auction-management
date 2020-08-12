import { sequelize } from '../../../../models';

export async function getAllBuyerInAuction(id) {
  try {
    return await sequelize.query(
      `select  user_id, email, fullname, auction_id, MAX(price) as price
    from auctionDB.auction_histories as auctionHis, auctionDB.buyers as buyer
    where auctionHis.user_id = buyer.id
    and auctionHis.auction_id = '${id}'
   group by user_id
    `,
      {
        raw: true,
        type: sequelize.QueryTypes.SELECT,
      },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
