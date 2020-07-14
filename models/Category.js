module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      categoryId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      categoryName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "category",
      updatedAt: "updated_at",
      createdAt: "created_at",
		}
	);
	return Category;
};
