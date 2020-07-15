module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: "id",
      },
      userId: {
        type: DataTypes.UUID,
        field: "user_id",
      },
      productId: {
        type: DataTypes.UUID,
        field: "product_id",
      },
    },
    {
      tableName: "favorites",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Buyers, {
      as: "buyers",
      foreignKey: "user_id",
    });
    Favorite.belongsTo(models.Products, {
      as: "products",
      foreignKey: "product_id",
    });
  };

  return Favorite;
};
