import { safeParseInt } from '../../../shared/helpers';

const _ = require('lodash');
const db = require('../../../../models');

export async function getAuctionsSortByBiddingCount(option) {
  try {
    return await db.sequelize.query(
      'select * \n' +
        'from (select product_id from auctionDB.auction_managements as auct inner join\n' +
        '\t(select auction_id, count(auction_id) as count \n' +
        '\t\tfrom auctionDB.auction_histories \n' +
        '        group by auction_id \n' +
        '        order by count desc \n' +
        `        limit ${safeParseInt(option, 5)}) as maxcount\n` +
        '\ton auct.id like maxcount.auction_id) as data \n' +
        'join auctionDB.products as products \n' +
        'where data.product_id like products.id',
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
