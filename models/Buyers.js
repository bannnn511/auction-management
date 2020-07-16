module.exports = (sequelize, DataTypes) => {
  const Buyers = sequelize.define(
    'Buyers',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'id',
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['buyer', 'admin'],
        field: 'type',
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'disable', 'deleted'],
        defaultValue: 'active',
        field: 'status',
      },
      address: {
        type: DataTypes.TEXT,
        field: 'address',
      },
      fullname: {
        type: DataTypes.STRING,
        field: 'fullname',
      },
      isSeller: {
        type: DataTypes.BOOLEAN,
        field: 'is_seller',
        defaultValue: false,
      },
      plusPoint: {
        type: DataTypes.INTEGER,
        field: 'plus_point',
      },
      minusPoint: {
        type: DataTypes.INTEGER,
        field: 'minus_point',
      },
    },
    {
      tableName: 'buyers',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    },
  );

  Buyers.associate = (models) => {
    Buyers.hasMany(models.Favorite, {
      as: 'favorites',
      foreignKey: 'user_id',
    });
    Buyers.hasMany(models.AuctionManagement, {
      as: 'auctionManagements',
      foreignKey: 'buyer_id',
    });
  };

  return Buyers;
};
