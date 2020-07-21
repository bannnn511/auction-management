module.exports = (sequelize, DataTypes) => {
  const AuctionHistory = sequelize.define(
    'AuctionHistory',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'id',
      },
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
      createdBy: {
        type: DataTypes.UUID,
        field: 'created_by',
      },
      updatedBy: {
        type: DataTypes.UUID,
        field: 'updated_by',
      },
    },
    {
      tableName: 'auctionHistory',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  AuctionHistory.associate = (models) => {
    AuctionHistory.belongsTo(models.AuctionManagement, {
      as: 'auctionManagements',
      foreignKey: 'auction_id',
    });
  };

  return AuctionHistory;
};
