module.exports = (sequelize, DataTypes) => {
	const CategoryManagement = sequelize.define(
		'CategoryManagement',{
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
		},{
			tableName:'category_management',
			updatedAt: 'updated_at',
			createdAt: 'created_at',
		}
	);
	return CategoryManagement;
}