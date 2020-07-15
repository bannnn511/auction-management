module.exports = (sequelize, DataTypes) => {
  const AuctionManagement = sequelize.define(
    'AuctionManagement',
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

  AuctionManagement.associate = (models) => {
    AuctionManagement.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'product_id',
    });
  };

  AuctionManagement.associate = (models) => {
    AuctionManagement.belongsTo(models.Buyers, {
      as: 'buyers',
      foreignKey: 'user_id',
    });
  };
  
  AuctionManagement.associate = (models) => {
    AuctionManagement.hasMany(models.AuctionHistory, {
      as: 'auctionHistory',
      foreignKey: 'user_id',
    });
  };

  AuctionManagement.associate = (models) => {
    AuctionManagement.hasMany(models.AuctionHistory, {
      as: 'auctionHistory',
      foreignKey: 'product_id',
    });
  };

  AuctionManagement.associate = (models) => {
    AuctionManagement.hasMany(models.Rating, {
      as: 'ratings',
      foreignKey: 'user_id',
    });
  };

  AuctionManagement.associate = (models) => {
    AuctionManagement.hasMany(models.Rating, {
      as: 'ratings',
      foreignKey: 'product_id',
    });
  };

  return AuctionManagement;
};
