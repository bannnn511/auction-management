const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "buyers", deps: []
 * createTable "categories", deps: []
 * createTable "products", deps: []
 * createTable "auction_managements", deps: [buyers, buyers, products]
 * createTable "auction_histories", deps: [auction_managements]
 * createTable "auction_participatings", deps: [buyers, auction_managements]
 * createTable "category_managments", deps: [categories, products]
 * createTable "favorites", deps: [categories, buyers, products, categories]
 * createTable "notifications", deps: [buyers]
 * createTable "onesignal", deps: [buyers]
 * createTable "ratings", deps: [buyers, buyers, auction_managements, buyers, buyers]
 * createTable "reminders", deps: [auction_managements]
 *
 * */

const info = {
  revision: 1,
  name: '1601971555000-init-db',
  created: '2020-10-06T08:05:56.167Z',
  comment: '',
};

const migrationCommands = function (transaction) {
  return [
    {
      fn: 'createTable',
      params: [
        'buyers',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            field: 'email',
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'password',
          },
          type: {
            type: Sequelize.ENUM('buyer', 'seller', 'admin'),
            field: 'type',
          },
          status: {
            type: Sequelize.ENUM('active', 'disable', 'deleted'),
            field: 'status',
            defaultValue: 'active',
          },
          address: {
            type: Sequelize.TEXT,
            field: 'address',
          },
          fullname: {
            type: Sequelize.STRING,
            field: 'fullname',
          },
          isSeller: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            field: 'is_seller',
          },
          plusPoint: {
            type: Sequelize.INTEGER,
            field: 'plus_point',
          },
          minusPoint: {
            type: Sequelize.INTEGER,
            field: 'minus_point',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'categories',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          categoryName: {
            type: Sequelize.STRING,
            field: 'category_name',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'products',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          productName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'product_name',
          },
          imgURL: {
            type: Sequelize.STRING,
            field: 'img_url',
          },
          currentPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'current_price',
          },
          buyNowPrice: {
            type: Sequelize.DECIMAL,
            field: 'buy_now_price',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'auction_managements',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          buyerId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'buyer_id',
          },
          sellerId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'seller_id',
          },
          productId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'products',
              key: 'id',
            },
            allowNull: true,
            field: 'product_id',
          },
          description: {
            type: Sequelize.TEXT,
            field: 'description',
          },
          endAt: {
            type: Sequelize.DATE,
            field: 'end_at',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'auction_histories',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            field: 'user_id',
          },
          auctionId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'auction_managements',
              key: 'id',
            },
            allowNull: true,
            field: 'auction_id',
          },
          price: {
            type: Sequelize.FLOAT,
            field: 'price',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'auction_participatings',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'user_id',
          },
          auctionId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'auction_managements',
              key: 'id',
            },
            allowNull: true,
            field: 'auction_id',
          },
          status: {
            type: Sequelize.ENUM('active', 'ban'),
            field: 'status',
          },
          isReminderCreated: {
            type: Sequelize.BOOLEAN,
            field: 'is_reminder_created',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'category_managments',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          categoryId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'categories',
              key: 'id',
            },
            allowNull: true,
            field: 'category_id',
          },
          productId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'products',
              key: 'id',
            },
            allowNull: true,
            field: 'product_id',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'favorites',
        {
          id: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'categories',
              key: 'id',
            },
            allowNull: true,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'user_id',
          },
          productId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'products',
              key: 'id',
            },
            allowNull: true,
            field: 'product_id',
          },
          categoryId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'categories',
              key: 'id',
            },
            allowNull: true,
            field: 'category_id',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'notifications',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'user_id',
          },
          description: {
            type: Sequelize.TEXT,
            field: 'description',
          },
          isRead: {
            type: Sequelize.BOOLEAN,
            field: 'is_read',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'onesignal',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'user_id',
          },
          playerId: {
            type: Sequelize.UUID,
            field: 'player_id',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'ratings',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          raterId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'rater_id',
          },
          ratedId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
            field: 'rated_id',
          },
          auctionId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'auction_managements',
              key: 'id',
            },
            allowNull: true,
            field: 'auction_id',
          },
          description: {
            type: Sequelize.TEXT,
            field: 'description',
          },
          point: {
            type: Sequelize.INTEGER,
            field: 'point',
          },
          createdBy: {
            type: Sequelize.UUID,
            field: 'created_by',
          },
          updatedBy: {
            type: Sequelize.UUID,
            field: 'updated_by',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
          rater_id: {
            type: Sequelize.UUID,
            field: 'rater_id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
          },
          rated_id: {
            type: Sequelize.UUID,
            field: 'rated_id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
              model: 'buyers',
              key: 'id',
            },
            allowNull: true,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'reminders',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            field: 'user_id',
          },
          auctionId: {
            type: Sequelize.UUID,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'auction_managements',
              key: 'id',
            },
            allowNull: true,
            field: 'auction_id',
          },
          pushAt: {
            type: Sequelize.DATE,
            field: 'push_at',
          },
          isPushed: {
            type: Sequelize.BOOLEAN,
            field: 'is_pushed',
          },
          created_at: {
            type: Sequelize.DATE,
            field: 'created_at',
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            field: 'updated_at',
            allowNull: false,
          },
        },
        {
          transaction,
        },
      ],
    },
  ];
};
const rollbackCommands = function (transaction) {
  return [
    {
      fn: 'dropTable',
      params: [
        'auction_histories',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'auction_managements',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'auction_participatings',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'buyers',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'categories',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'category_managments',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'favorites',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'notifications',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'onesignal',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'products',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'ratings',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'reminders',
        {
          transaction,
        },
      ],
    },
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute(queryInterface, Sequelize, _commands) {
    let index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise((resolve, reject) => {
        function next() {
          if (index < commands.length) {
            const command = commands[index];
            console.log(`[#${index}] execute: ${command.fn}`);
            index++;
            queryInterface[command.fn]
              .apply(queryInterface, command.params)
              .then(next, reject);
          } else resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    }
    return run(null);
  },
  up(queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down(queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info,
};
