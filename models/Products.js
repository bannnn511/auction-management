module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      productId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'product_id',
      },
      productName: {
        type: DataTypes.TEXT,
        field: 'product_name',
        allowNull: false,
      },
      imgURL: {
        type: DataTypes.TEXT,
        field: 'img_url',
      },
      currentPrice: {
        type: DataTypes.FLOAT,
        field: 'current_price',
        allowNull: false,
      },
      buyNowPrice: {
        type: DataTypes.FLOAT,
        field: 'buy_now_price',
      },
      endAt: {
        type: DataTypes.DATE,
        field: 'end_at',
      },
    },
    {
      tableName: 'products',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );
  Products.associate = (models) => {
    Products.hasMany(models.CategoryManagement, {
      as: 'categoryManagement',
      foreignKey: 'product_id',
    });
  };

  Products.associate = (models) => {
    Products.hasMany(models.Favorite, {
      as: 'favorites',
      foreignKey: 'product_id',
    });
  };
  return Products;
};
