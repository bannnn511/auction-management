'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "auction_participatings", deps: [buyers, auction_managements]
 *
 **/

var info = {
    "revision": 4,
    "name": "1597638633000-create-auction-participating-model",
    "created": "2020-08-17T04:30:35.053Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "auction_participatings",
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
                        "model": "buyers",
                        "key": "id"
                    },
                    "allowNull": true,
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
                "status": {
                    "type": Sequelize.ENUM('active', 'ban'),
                    "field": "status"
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
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "dropTable",
        params: ["auction_participatings", {
            transaction: transaction
        }]
    }];
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
