const db = require('../../../../models');

export async function getAllAuctions() {
  try {
    const auctions = await db.AuctionManagements.findAll({
      include: [
        {
          model: db.Products,
          as: 'products',
          // through: {
          //   attributes: ['productName'],
          // },
        },
      ],
    });
    console.log('auctionsauctions', auctions);
    return auctions;
  } catch (error) {
    console.log(error);
    return null;
  }
}
