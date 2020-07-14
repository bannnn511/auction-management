module.exports = (sequelize, DataTypes) => {
	const Rating = sequelize.define(
		'Rating', 
		{
			userID: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			ratedUserId: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			productID: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			description: {
				type: DataTypes.TEXT,
			},
			point: {
				type: DataTypes.INTEGER,
			},
		}, 
		{
			tableName: 'rating',
			updatedAt: 'updated_at',
			createdAt: 'createdAt',
		}
	);
	return Rating;
};