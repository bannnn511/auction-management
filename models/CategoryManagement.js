module.exports = (sequelize, DataTypes) => {
  const CategoryManagement = sequelize.define(
    'CategoryManagement',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'id',
      },
      categoryId: {
        type: DataTypes.UUID,
        field: 'category_id',
      },
      productId: {
        type: DataTypes.UUID,
        field: 'product_id',
      },
    },
    {
      tableName: 'categoryManagment',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  CategoryManagement.associate = (models) => {
    CategoryManagement.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
    CategoryManagement.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'product_id',
    });
  };

  return CategoryManagement;
};
