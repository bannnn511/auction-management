module.exports = (sequelize, DataTypes) => {
	const CategoryManagement = sequelize.define(
		'CategoryManagement', {
		categoryId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		productId: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		}
	}, {
		tableName: 'category_management',
		updatedAt: 'updated_at',
		createdAt: 'created_at',
	}
	);

	CategoryManagement.associate = (models) => {
		CategoryManagement.belongsTo(models.Category, {
			as: 'Category',
			foreignKey: 'categoryId',
		});
	};

	CategoryManagement.associate = (models) => {
		CategoryManagement.belongsTo(models.Products, {
			as: 'Products',
			foreignKey: 'productId',
		});
	};
	return CategoryManagement;
}