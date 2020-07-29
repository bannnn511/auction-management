const db = require('../../../../models');

// get data of auction + products with JOIN
export async function getAllAuctions() {
  try {
    const auctions = await db.AuctionManagements.findAll({
      include: [
        {
          model: db.Products,
          as: 'products',
        },
      ],
    });
    return auctions;
  } catch (error) {
    console.log(error);
    return null;
  }
}
