module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'Favorite',
    {
      userId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'user_id',
      },
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    Favorite.belongsTo(models.Buyer, {
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
