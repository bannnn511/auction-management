module.exports = (sequelize, DataTypes) => {
    const AuctionManagements = sequelize.define(
      'AuctionManagements',
      {
        userId: {
          type: DataTypes.UUID,
          field: 'userId',
        },
        productId: {
            type: DataTypes.UUID,
            field: 'productId',
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description',
        },
      },
      {
        tableName: 'auctionManagements',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
    
    return AuctionManagements;
  };
  