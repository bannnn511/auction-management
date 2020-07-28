module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    'Ratings',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'id',
      },
      raterId: {
        type: DataTypes.UUID,
        field: 'rater_id',
      },
      ratedId: {
        type: DataTypes.UUID,
        field: 'rated_id',
      },
      auctionId: {
        type: DataTypes.UUID,
        field: 'auction_id',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      point: {
        type: DataTypes.INTEGER,
        field: 'point',
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
      tableName: 'ratings',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  Ratings.associate = (models) => {
    Ratings.belongsTo(models.AuctionManagements, {
      as: 'auctionManagements',
      foreignKey: 'auctionId',
    });
    Ratings.belongsTo(models.Buyers, {
      as: 'raterUser',
      foreignKey: 'raterId',
    });
    Ratings.belongsTo(models.Buyers, {
      as: 'ratedUser',
      foreignKey: 'ratedId',
    });
  };

  return Ratings;
};
