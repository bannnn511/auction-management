'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "auctionHistory", deps: []
 * createTable "buyers", deps: []
 * createTable "category", deps: []
 * createTable "products", deps: []
 * createTable "ratings", deps: []
 * createTable "users", deps: []
 * createTable "auctionManagements", deps: [buyers, products]
 * createTable "categoryManagment", deps: [category, products]
 * createTable "favorites", deps: [products]
 *
 **/

var info = {
    "revision": 1,
    "name": "1594785988000-create_relationship-of-table",
    "created": "2020-07-15T04:06:29.496Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "auctionHistory",
                {
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "user_id",
                        "primaryKey": true
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "primaryKey": true
                    },
                    "price": {
                        "type": Sequelize.FLOAT,
                        "field": "price"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "buyers",
                {
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "user_id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "unique": true,
                        "allowNull": false,
                        "field": "email"
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "allowNull": false,
                        "field": "password"
                    },
                    "type": {
                        "type": Sequelize.ENUM('buyer', 'admin'),
                        "field": "type"
                    },
                    "status": {
                        "type": Sequelize.ENUM('active', 'disable', 'deleted'),
                        "field": "status",
                        "defaultValue": "active"
                    },
                    "address": {
                        "type": Sequelize.TEXT,
                        "field": "address"
                    },
                    "fullname": {
                        "type": Sequelize.STRING,
                        "field": "fullname"
                    },
                    "isSeller": {
                        "type": Sequelize.BOOLEAN,
                        "defaultValue": false,
                        "field": "is_seller"
                    },
                    "plusPoint": {
                        "type": Sequelize.INTEGER,
                        "field": "plus_point"
                    },
                    "minusPoint": {
                        "type": Sequelize.INTEGER,
                        "field": "minus_point"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "category",
                {
                    "categoryId": {
                        "type": Sequelize.UUID,
                        "field": "category_id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "categoryName": {
                        "type": Sequelize.STRING,
                        "field": "category_name"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "products",
                {
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productName": {
                        "type": Sequelize.TEXT,
                        "allowNull": false,
                        "field": "product_name"
                    },
                    "imgURL": {
                        "type": Sequelize.TEXT,
                        "field": "img_url"
                    },
                    "currentPrice": {
                        "type": Sequelize.FLOAT,
                        "allowNull": false,
                        "field": "current_price"
                    },
                    "buyNowPrice": {
                        "type": Sequelize.FLOAT,
                        "field": "buy_now_price"
                    },
                    "endAt": {
                        "type": Sequelize.DATE,
                        "field": "end_at"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "ratings",
                {
                    "userID": {
                        "type": Sequelize.UUID,
                        "field": "user_id",
                        "primaryKey": true
                    },
                    "ratedUserId": {
                        "type": Sequelize.UUID,
                        "field": "rated_user_id",
                        "primaryKey": true
                    },
                    "productID": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "primaryKey": true
                    },
                    "description": {
                        "type": Sequelize.TEXT,
                        "field": "description"
                    },
                    "point": {
                        "type": Sequelize.INTEGER,
                        "field": "point"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "users",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address"
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password"
                    },
                    "role": {
                        "type": Sequelize.ENUM('client', 'admin'),
                        "field": "role"
                    },
                    "status": {
                        "type": Sequelize.ENUM('active', 'disable', 'deleted'),
                        "field": "status",
                        "defaultValue": "active"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "auctionManagements",
                {
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "user_id",
                        "primaryKey": true
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "primaryKey": true
                    },
                    "description": {
                        "type": Sequelize.TEXT,
                        "field": "description"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "user_id": {
                        "type": Sequelize.UUID,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "buyers",
                            "key": "user_id"
                        },
                        "allowNull": true
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "products",
                            "key": "product_id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "categoryManagment",
                {
                    "categoryId": {
                        "type": Sequelize.UUID,
                        "field": "category_id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "category_id": {
                        "type": Sequelize.UUID,
                        "field": "category_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "category",
                            "key": "category_id"
                        },
                        "allowNull": true
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "products",
                            "key": "product_id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "favorites",
                {
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "user_id",
                        "primaryKey": true
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "unique": true,
                        "primaryKey": true
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "products",
                            "key": "product_id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["auctionHistory", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["auctionManagements", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["buyers", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["category", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["categoryManagment", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["favorites", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["products", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["ratings", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
