'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "productId" on table "category_management"
 * changeColumn "productId" on table "category_management"
 * changeColumn "categoryId" on table "category_management"
 * changeColumn "categoryId" on table "category_management"
 *
 **/

var info = {
    "revision": 2,
    "name": "1594725708000-create-relationship-category-product",
    "created": "2020-07-14T11:21:48.815Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "changeColumn",
            params: [
                "category_management",
                "productId",
                {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "products",
                        "key": "productId"
                    },
                    "allowNull": true,
                    "field": "productId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "category_management",
                "productId",
                {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "products",
                        "key": "productId"
                    },
                    "allowNull": true,
                    "field": "productId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "category_management",
                "categoryId",
                {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "categoryId"
                    },
                    "allowNull": true,
                    "field": "categoryId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "category_management",
                "categoryId",
                {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "categoryId"
                    },
                    "allowNull": true,
                    "field": "categoryId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
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
            fn: "changeColumn",
            params: [
                "category_management",
                "productId",
                {
                    "type": Sequelize.UUID,
                    "field": "productId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "category_management",
                "productId",
                {
                    "type": Sequelize.UUID,
                    "field": "productId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "category_management",
                "categoryId",
                {
                    "type": Sequelize.UUID,
                    "field": "categoryId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "category_management",
                "categoryId",
                {
                    "type": Sequelize.UUID,
                    "field": "categoryId",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true
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
