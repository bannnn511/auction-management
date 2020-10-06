module.exports = (sequelize, DataTypes) => {
  const OneSignal = sequelize.define(
    'OneSignal',
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
      playerId: {
        type: DataTypes.UUID,
        field: 'player_id',
      },
    },
    {
      tableName: 'favorites',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  OneSignal.associate = (models) => {
    OneSignal.belongsTo(models.Buyers, {
      as: 'onesignal',
      foreignKey: 'userId',
    });
  };

  return OneSignal;
};
