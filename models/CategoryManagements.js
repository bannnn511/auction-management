module.exports = (sequelize, DataTypes) => {
  const CategoryManagements = sequelize.define(
    'CategoryManagements',
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
      tableName: 'category_managments',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  CategoryManagements.associate = (models) => {
    CategoryManagements.belongsTo(models.Categories, {
      as: 'categories',
      foreignKey: 'categoryId',
    });
    CategoryManagements.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'productId',
    });
  };

  return CategoryManagements;
};
