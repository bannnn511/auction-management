module.exports = (sequelize, DataTypes) => {
  const AuctionHistory = sequelize.define(
    'AuctionHistory',
    {
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      productId: {
        type: DataTypes.UUID,
        field: 'product_id',
      },
      price: {
        type: DataTypes.FLOAT,
        field: 'price',
      },
    },
    {
      tableName: 'auctionHistory',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  return AuctionHistory;
};
