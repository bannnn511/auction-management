const db = require('../../../../models');

export async function getAuctionWithAuctionId(id) {
  try {
    const auction = await db.AuctionManagements.findOne({
      where: {
        id,
      },
    });
    return auction;
  } catch (error) {
    console.log(error);
    return null;
  }
}
