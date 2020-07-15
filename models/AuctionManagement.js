module.exports = (sequelize, DataTypes) => {
  const AuctionManagements = sequelize.define(
    'AuctionManagements',
    {
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      productId: {
        type: DataTypes.UUID,
        field: 'product_id',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
    },
    {
      tableName: 'auctionManagements',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  return AuctionManagements;
};
