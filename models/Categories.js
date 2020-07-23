module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
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
      tableName: 'categories',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  Categories.associate = (models) => {
    Categories.hasMany(models.CategoryManagements, {
      as: 'category_managements',
      foreignKey: 'categoryId',
    });
  };

  return Categories;
};
