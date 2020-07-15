module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'Favorite',
    {
      userId: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'user_id',
      },
      productId: {
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        field: 'product_id',
      },
    },
    {
      tableName: 'favorites',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Buyers, {
      as: 'buyers',
      foreignKey: 'user_id',
    });
  };

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'product_id',
    });
  };

  return Favorite;
};
