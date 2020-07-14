module.exports = (sequelize, DataTypes) => {
	const Favorite = sequelize.define(
		'Favorite', 
		{
			userId: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			productId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
			},
		}, 
		{
			tableName: 'favorite',
			updatedAt: 'updated_at',
			createdAt: 'created_at',
		}
	);

	return Favorite;
};