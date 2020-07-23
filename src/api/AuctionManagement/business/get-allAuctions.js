import { AuctionManagement, Products } from '../../../../models/index';

export async function getAllAuctions() {
  try {
    const auctions = await AuctionManagement.findAll({
      include: [
        {
          model: Products,
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
