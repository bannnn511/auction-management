module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'user_id',
      },
      ratedUserId: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'rated_user_id',
      },
      productID: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'product_id',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      point: {
        type: DataTypes.INTEGER,
        field: 'point',
      },
    },
    {
      tableName: 'ratings',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.AuctionManagement, {
      as: 'auctionManagements',
      foreignKey: 'user_id',
    });
  };

  Rating.associate = (models) => {
    Rating.belongsTo(models.AuctionManagement, {
      as: 'auctionManagements',
      foreignKey: 'product_id',
    });
  };

  return Rating;
};
