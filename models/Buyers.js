module.exports = (sequelize, DataTypes) => {
    const Buyers = sequelize.define(
      'Buyers',
      {
        userId: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
            field: 'fullname'
        },
        isSeller: {
            type: DataTypes.BOOLEAN,
            field: 'isSeller',
            defaultValue: false,
        },
        plusPoint: {
            type: DataTypes.INTEGER,
            field: 'plusPoint'
        },
        minusPoint: {
            type: DataTypes.INTEGER,
            field: 'minusPoint'
        },
      },
      {
        tableName: 'buyers',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
    return Buyers;
  };
