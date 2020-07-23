module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'id',
      },
      productName: {
        type: DataTypes.STRING,
        field: 'product_name',
        allowNull: false,
      },
      imgURL: {
        type: DataTypes.STRING,
        field: 'img_url',
      },
      currentPrice: {
        type: DataTypes.DECIMAL,
        field: 'current_price',
        allowNull: false,
      },
      buyNowPrice: {
        type: DataTypes.DECIMAL,
        field: 'buy_now_price',
      },
      endAt: {
        type: DataTypes.DATE,
        field: 'end_at',
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
      tableName: 'products',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );
  Products.associate = (models) => {
    Products.hasMany(models.CategoryManagements, {
      as: 'categoryManagements',
      foreignKey: 'productId',
    });
    Products.hasMany(models.Favorites, {
      as: 'favorites',
      foreignKey: 'productId',
    });
    Products.hasMany(models.AuctionManagements, {
      as: 'auctionManagements',
      foreignKey: 'productId',
    });
  };

  return Products;
};
