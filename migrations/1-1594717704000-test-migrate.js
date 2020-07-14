'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "clients", deps: []
 * createTable "comments", deps: [clients]
 *
 **/

var info = {
    "revision": 1,
    "name": "1594717704000-test-migrate",
    "created": "2020-07-14T09:08:25.003Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "clients",
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
                "comments",
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
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "clients",
                            "key": "userId"
                        },
                        "allowNull": true,
                        "field": "user_id"
                    },
                    "content": {
                        "type": Sequelize.STRING,
                        "field": "content"
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
            params: ["comments", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["clients", {
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
