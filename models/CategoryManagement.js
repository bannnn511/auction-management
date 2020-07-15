module.exports = (sequelize, DataTypes) => {
  const CategoryManagement = sequelize.define(
    'CategoryManagement',
    {
      categoryId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'category_id',
      },
      productId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'product_id',
      },
    },
    {
      tableName: 'categoryManagment',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  CategoryManagement.associate = (models) => {
    CategoryManagement.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
  };

  CategoryManagement.associate = (models) => {
    CategoryManagement.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'product_id',
    });
  };
  return CategoryManagement;
};
