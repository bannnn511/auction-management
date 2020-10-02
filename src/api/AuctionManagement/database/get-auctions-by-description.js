const db = require('../../../../models');

export async function getAuctionsByDescription(description) {
  return db.AuctionManagements.findAll({
    include: [{ model: db.Products, as: 'products' }],
    where: db.Sequelize.literal(
      `MATCH (description) AGAINST ('${description}' IN NATURAL LANGUAGE MODE)`,
    ),
  });
}
