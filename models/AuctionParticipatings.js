module.exports = (sequelize, DataTypes) => {
  const AuctionParticipatings = sequelize.define(
    'AuctionParticipating',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'id',
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      auctionId: {
        type: DataTypes.UUID,
        field: 'auction_id',
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'ban'],
        field: 'status',
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
      tableName: 'auction_participatings',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  AuctionParticipatings.associate = (models) => {
    AuctionParticipatings.belongsTo(models.Buyers, {
      as: 'auctionParticipatings',
      foreignKey: 'userId',
    });
    AuctionParticipatings.belongsTo(models.AuctionManagements, {
      as: 'auctionManagements',
      foreignKey: 'auctionId',
    });
  };

  return AuctionParticipatings;
};
