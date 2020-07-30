import { safeParseInt } from '../../../shared/helpers';
import { defaultLimit } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getAuctionsSortByBiddingCount(option) {
  try {
    return await db.sequelize.query(
      'select * \n' +
        'from (select product_id, count, end_at from auctionDB.auction_managements as auct inner join\n' +
        '\t(select auction_id, count(auction_id) as count \n' +
        '\t\tfrom auctionDB.auction_histories \n' +
        '        group by auction_id ) as maxcount\n' +
        '\ton auct.id like maxcount.auction_id) as data \n' +
        'join auctionDB.products as products \n' +
        'where data.product_id like products.id and end_at>=curdate()\n' +
        'order by count desc\n' +
        `limit ${safeParseInt(option, defaultLimit)};`,
      {
        raw: true,
        type: db.sequelize.QueryTypes.SELECT,
      },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
