module.exports = (sequelize, DataTypes) => {
  const Reminders = sequelize.define(
    'Reminders',
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
      pushAt: {
        type: DataTypes.DATE,
        field: 'push_at',
      },
      isPushed: {
        type: DataTypes.BOOLEAN,
        field: 'is_pushed',
      },
    },
    {
      tableName: 'reminders',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  Reminders.associate = (models) => {
    Reminders.belongsTo(models.AuctionManagements, {
      as: 'reminder',
      foreignKey: 'auctionId',
    });
  };
  return Reminders;
};
