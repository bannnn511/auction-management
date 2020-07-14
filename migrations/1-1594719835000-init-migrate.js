'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "category", deps: []
 * createTable "category_management", deps: []
 * createTable "favorite", deps: []
 * createTable "rating", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "1594719835000-init-migrate",
    "created": "2020-07-14T09:43:56.084Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
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
