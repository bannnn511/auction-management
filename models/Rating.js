module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: "id",
      },
      raterID: {
        type: DataTypes.UUID,
        field: "rater_id",
      },
      ratedID: {
        type: DataTypes.UUID,
        field: "rated_id",
      },
      auctionID: {
        type: DataTypes.UUID,
        field: "auction_id",
      },
      description: {
        type: DataTypes.TEXT,
        field: "description",
      },
      point: {
        type: DataTypes.INTEGER,
        field: "point",
      },
    },
    {
      tableName: "ratings",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.AuctionManagement, {
      as: "auctionManagements",
      foreignKey: "auction_id",
    });
    Rating.belongsTo(models.Buyers, {
      as: "raterUser",
      foreignKey: "rater_id",
    });
    Rating.belongsTo(models.Buyers, {
      as: "ratedUser",
      foreignKey: "rated_id",
    });
  };

  return Rating;
};
