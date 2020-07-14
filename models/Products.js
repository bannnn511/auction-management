module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
      'Products',
      {
        productId: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        productName: {
            type: DataTypes.TEXT,
            field: 'productName',
            allowNull: false,
        },
        imgURL: {
            type: DataTypes.TEXT,
            field: 'imgUrl'
        },
        currentPrice: {
            type: DataTypes.FLOAT,
            field: 'currentPrice',
            allowNull: false,
        },
        buyNowPrice: {
            type: DataTypes.FLOAT,
            field: 'buyNowPrice',
        },
        endAt: {
            type: DataTypes.DATE,
            field: 'endAt'
        }
      },
      {
        tableName: 'products',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
    Products.associate = (models) => {
        Products.hasMany(models.CategoryManagement, {
          as: 'CategoryManagement',
          foreignKey: 'productId',
        });
      }
    return Products;
  };
  