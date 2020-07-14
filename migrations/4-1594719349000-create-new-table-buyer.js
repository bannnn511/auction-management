'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "clients"
 * createTable "buyers", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "1594719349000-create-new-table-buyer",
    "created": "2020-07-14T09:35:49.855Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["clients", {
                transaction: transaction
            }]
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
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["buyers", {
                transaction: transaction
            }]
        },
        {
            fn: "createTable",
            params: [
                "clients",
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
