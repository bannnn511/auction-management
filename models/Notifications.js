module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    'Notifications',
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
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        field: 'is_read',
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
      tableName: 'notifications',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Buyers, {
      as: 'notifications',
      foreignKey: 'userId',
    });
  };
  return Notifications;
};
