module.exports = (sequelize, DataTypes) => {
    const AuctionHistory = sequelize.define(
      'AuctionHistory',
      {
        userId: {
          type: DataTypes.UUID,
          field: 'userId',
        },
        productId: {
            type: DataTypes.UUID,
            field: 'productId',
        },
        price: {
            type: DataTypes.FLOAT,
            field: 'price',
        },
      },
      {
        tableName: 'auctionHistory',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      }
    );
    
    return AuctionHistory;
  };