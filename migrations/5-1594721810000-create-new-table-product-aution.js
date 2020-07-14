'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "auctionHistory", deps: []
 * createTable "auctionManagements", deps: []
 * createTable "products", deps: []
 *
 **/

var info = {
    "revision": 5,
    "name": "1594721810000-create-new-table-product-aution",
    "created": "2020-07-14T10:16:51.229Z",
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
            params: ["products", {
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
