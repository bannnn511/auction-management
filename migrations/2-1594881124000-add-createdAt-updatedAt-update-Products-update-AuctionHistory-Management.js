'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "product_id" from table "auctionHistory"
 * removeColumn "auction_id" from table "auctionManagements"
 * dropTable "users"
 * addColumn "updatedBy" to table "auctionManagements"
 * addColumn "createdBy" to table "auctionManagements"
 * addColumn "updatedBy" to table "auctionHistory"
 * addColumn "createdBy" to table "auctionHistory"
 * addColumn "auction_id" to table "auctionHistory"
 * addColumn "updatedBy" to table "buyers"
 * addColumn "createdBy" to table "buyers"
 * addColumn "updatedBy" to table "category"
 * addColumn "createdBy" to table "category"
 * addColumn "updatedBy" to table "categoryManagment"
 * addColumn "createdBy" to table "categoryManagment"
 * addColumn "updatedBy" to table "favorites"
 * addColumn "createdBy" to table "favorites"
 * addColumn "updatedBy" to table "products"
 * addColumn "createdBy" to table "products"
 * addColumn "updatedBy" to table "ratings"
 * addColumn "createdBy" to table "ratings"
 * changeColumn "buyNowPrice" on table "products"
 * changeColumn "currentPrice" on table "products"
 * changeColumn "imgURL" on table "products"
 * changeColumn "productName" on table "products"
 *
 **/

var info = {
    "revision": 2,
    "name": "1594881124000-add-createdAt-updatedAt-update-Products-update-AuctionHistory-Management",
    "created": "2020-07-16T06:32:05.453Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "auctionHistory",
                "product_id",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "auctionManagements",
                "auction_id",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "dropTable",
            params: ["users", {
                transaction: transaction
            }]
        },
        {
            fn: "addColumn",
            params: [
                "auctionManagements",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "auctionManagements",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "auctionHistory",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "auctionHistory",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "auctionHistory",
                "auction_id",
                {
                    "type": Sequelize.UUID,
                    "field": "auction_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "auctionManagements",
                        "key": "id"
                    },
                    "allowNull": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "buyers",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "buyers",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "category",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "category",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "categoryManagment",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "categoryManagment",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "favorites",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "favorites",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "products",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "products",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "ratings",
                "updated_by",
                {
                    "type": Sequelize.UUID,
                    "field": "updated_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "ratings",
                "created_by",
                {
                    "type": Sequelize.UUID,
                    "field": "created_by"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "buy_now_price",
                {
                    "type": Sequelize.DECIMAL,
                    "field": "buy_now_price"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "current_price",
                {
                    "type": Sequelize.DECIMAL,
                    "allowNull": false,
                    "field": "current_price"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "img_url",
                {
                    "type": Sequelize.STRING,
                    "field": "img_url"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "product_name",
                {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "field": "product_name"
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "auctionHistory",
                "auction_id",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "auctionHistory",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "auctionHistory",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "auctionManagements",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "auctionManagements",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "category",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "category",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "categoryManagment",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "categoryManagment",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "favorites",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "favorites",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "products",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "products",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "ratings",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "ratings",
                "created_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "buyers",
                "updated_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "buyers",
                "created_by",
                {
                    transaction: transaction
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
            fn: "addColumn",
            params: [
                "auctionManagements",
                "auction_id",
                {
                    "type": Sequelize.UUID,
                    "field": "auction_id"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "auctionHistory",
                "product_id",
                {
                    "type": Sequelize.UUID,
                    "field": "product_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "auctionManagements",
                        "key": "id"
                    },
                    "allowNull": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "buy_now_price",
                {
                    "type": Sequelize.FLOAT,
                    "field": "buy_now_price"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "current_price",
                {
                    "type": Sequelize.FLOAT,
                    "allowNull": false,
                    "field": "current_price"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "img_url",
                {
                    "type": Sequelize.TEXT,
                    "field": "img_url"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "products",
                "product_name",
                {
                    "type": Sequelize.TEXT,
                    "allowNull": false,
                    "field": "product_name"
                },
                {
                    transaction: transaction
                }
            ]
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
