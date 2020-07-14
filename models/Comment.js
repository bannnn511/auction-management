module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      content: {
        type: DataTypes.STRING,
        field: 'content',
      },
    },
    {
      tableName: 'comments',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return Comment;
};
