module.exports = (sequelize, DataTypes) => {
  const AuctionHistory = sequelize.define(
    'AuctionHistory',
    {
      userId: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'user_id',
      },
      productId: {
        primaryKey: true,
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

  AuctionHistory.associate = (models) => {
    AuctionHistory.belongsTo(models.AuctionManagement, {
      as: 'auctionManagements',
      foreignKey: 'user_id',
    });
  };

  AuctionHistory.associate = (models) => {
    AuctionHistory.belongsTo(models.AuctionManagement, {
      as: 'auctionManagements',
      foreignKey: 'product_id',
    });
  };

  return AuctionHistory;
};
