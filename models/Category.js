module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
      categoryName: {
        type: DataTypes.STRING,
        field: 'category_name',
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
      tableName: 'category',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.CategoryManagement, {
      as: 'categoryManagement',
      foreignKey: 'category_id',
    });
  };

  return Category;
};
