module.exports = (sequelize, DataTypes) => {
  const AuctionHistories = sequelize.define(
    'AuctionHistories',
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
      auctionId: {
        type: DataTypes.UUID,
        field: 'auction_id',
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
      tableName: 'auction_histories',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  AuctionHistories.associate = (models) => {
    AuctionHistories.belongsTo(models.AuctionManagements, {
      as: 'auction_managements',
      foreignKey: 'auctionId',
    });
  };

  return AuctionHistories;
};
