module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
      },
      address: {
        type: DataTypes.STRING,
        field: 'address',
      },
      // comments: {
      //   type: DataTypes.ARRAY,
      //   field: 'comments',
      // },
      password: {
        type: DataTypes.STRING,
        field: 'password',
      },
      role: {
        type: DataTypes.ENUM,
        values: ['client', 'admin'],
        field: 'role',
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'disable', 'deleted'],
        defaultValue: 'active',
        field: 'status',
      },
    },
    {
      tableName: 'users',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );
  // User.associate = function (models) {
  //   User.hasMany(models.Comment, {
  //     as: 'comments',
  //     foreignKey: 'userId',
  //   });
  // };
  return User;
};
