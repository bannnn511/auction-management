module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define(
    'Favorites',
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
      tableName: 'favorites',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  Favorites.associate = (models) => {
    Favorites.belongsTo(models.Buyers, {
      as: 'buyers',
      foreignKey: 'userId',
    });
    Favorites.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'productId',
    });
  };

  return Favorites;
};
