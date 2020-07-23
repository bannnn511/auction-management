'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "buyers", deps: []
 * createTable "categories", deps: []
 * createTable "products", deps: []
 * createTable "auction_managements", deps: [buyers, buyers, products, buyers]
 * createTable "auction_histories", deps: [auction_managements]
 * createTable "category_managments", deps: [categories, products]
 * createTable "favorites", deps: [buyers, products]
 * createTable "ratings", deps: [buyers, auction_managements, buyers]
 *
 **/

var info = {
    "revision": 1,
    "name": "1595501105000-init-db",
    "created": "2020-07-23T10:45:06.130Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "buyers",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
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
                        "type": Sequelize.ENUM('buyer', 'seller', 'admin'),
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
                    "fullame": {
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
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                "categories",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "categoryId": {
                        "type": Sequelize.UUID,
                        "field": "category_id"
                    },
                    "categoryName": {
                        "type": Sequelize.STRING,
                        "field": "category_name"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "productName": {
                        "type": Sequelize.STRING,
                        "allowNull": false,
                        "field": "product_name"
                    },
                    "imgURL": {
                        "type": Sequelize.STRING,
                        "field": "img_url"
                    },
                    "currentPrice": {
                        "type": Sequelize.DECIMAL,
                        "allowNull": false,
                        "field": "current_price"
                    },
                    "buyNowPrice": {
                        "type": Sequelize.DECIMAL,
                        "field": "buy_now_price"
                    },
                    "endAt": {
                        "type": Sequelize.DATE,
                        "field": "end_at"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                "auction_managements",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "buyerId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "buyers",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "buyer_id"
                    },
                    "sellerId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "buyers",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "seller_id"
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "products",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "product_id"
                    },
                    "description": {
                        "type": Sequelize.TEXT,
                        "field": "description"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                    "buyerID": {
                        "type": Sequelize.UUID,
                        "field": "buyerID",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "buyers",
                            "key": "id"
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
                "auction_histories",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "user_id"
                    },
                    "auctionId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "auction_managements",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "auction_id"
                    },
                    "price": {
                        "type": Sequelize.FLOAT,
                        "field": "price"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                "category_managments",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "categoryId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "categories",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "category_id"
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "products",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "product_id"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                "favorites",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "userId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "buyers",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "user_id"
                    },
                    "productId": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "products",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "product_id"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "defaultValue": Sequelize.UUIDV4,
                        "primaryKey": true
                    },
                    "raterID": {
                        "type": Sequelize.UUID,
                        "field": "rater_id"
                    },
                    "ratedID": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "buyers",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "rated_id"
                    },
                    "auctionID": {
                        "type": Sequelize.UUID,
                        "field": "auction_id"
                    },
                    "description": {
                        "type": Sequelize.TEXT,
                        "field": "description"
                    },
                    "point": {
                        "type": Sequelize.INTEGER,
                        "field": "point"
                    },
                    "createdBy": {
                        "type": Sequelize.UUID,
                        "field": "created_by"
                    },
                    "updatedBy": {
                        "type": Sequelize.UUID,
                        "field": "updated_by"
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
                    "auctionId": {
                        "type": Sequelize.UUID,
                        "field": "auctionId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "auction_managements",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "raterId": {
                        "type": Sequelize.UUID,
                        "field": "raterId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "buyers",
                            "key": "id"
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
            params: ["auction_histories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["auction_managements", {
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
            params: ["categories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["category_managments", {
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
