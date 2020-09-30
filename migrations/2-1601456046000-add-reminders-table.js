'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "reminders", deps: []
 * addColumn "isReminderCreated" to table "auction_participatings"
 *
 **/

var info = {
    "revision": 2,
    "name": "1601456046000-add-reminders-table",
    "created": "2020-09-30T08:54:07.069Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "reminders",
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
                        "field": "auction_id"
                    },
                    "pushAt": {
                        "type": Sequelize.DATE,
                        "field": "push_at"
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
                "auction_participatings",
                "is_reminder_created",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_reminder_created"
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
                "auction_participatings",
                "is_reminder_created",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "dropTable",
            params: ["reminders", {
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
