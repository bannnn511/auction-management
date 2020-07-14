'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "auctionHistory", deps: []
 * createTable "auctionManagements", deps: []
 * createTable "buyers", deps: []
 * createTable "category", deps: []
 * createTable "category_management", deps: []
 * createTable "favorite", deps: []
 * createTable "products", deps: []
 * createTable "rating", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "1594722976000-update-db",
    "created": "2020-07-14T10:36:17.288Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "auctionHistory",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "userId"
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "productId"
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
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "userId"
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "productId"
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
                        "field": "userId",
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
                        "field": "isSeller"
                    },
                    "plusPoint": {
                        "type": Sequelize.INTEGER,
                        "field": "plusPoint"
                    },
                    "minusPoint": {
                        "type": Sequelize.INTEGER,
                        "field": "minusPoint"
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
                        "field": "categoryId",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "categoryName": {
                        "type": Sequelize.STRING,
                        "field": "categoryName"
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
                "category_management",
                {
                    "categoryId": {
                        "type": Sequelize.UUID,
                        "field": "categoryId",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "productId",
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
                "favorite",
                {
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "userId",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "field": "productId",
                        "unique": true,
                        "defaultValue": Sequelize.UUIDV4
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
                        "field": "productId",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productName": {
                        "type": Sequelize.TEXT,
                        "allowNull": false,
                        "field": "productName"
                    },
                    "imgURL": {
                        "type": Sequelize.TEXT,
                        "field": "imgUrl"
                    },
                    "currentPrice": {
                        "type": Sequelize.FLOAT,
                        "allowNull": false,
                        "field": "currentPrice"
                    },
                    "buyNowPrice": {
                        "type": Sequelize.FLOAT,
                        "field": "buyNowPrice"
                    },
                    "endAt": {
                        "type": Sequelize.DATE,
                        "field": "endAt"
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
                "rating",
                {
                    "userID": {
                        "type": Sequelize.UUID,
                        "field": "userID",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "ratedUserId": {
                        "type": Sequelize.UUID,
                        "field": "ratedUserId",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productID": {
                        "type": Sequelize.UUID,
                        "field": "productID",
                        "defaultValue": Sequelize.UUIDV4,
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
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
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
            params: ["category_management", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["favorite", {
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
            params: ["rating", {
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
