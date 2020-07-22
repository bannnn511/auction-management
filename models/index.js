const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw new Error(result.error);
}
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

// let sequelize = new Sequelize(process.env.MYSQL_URI, sequelizeOptions);
const dbName = process.env.MYSQL_DB;
const dbUserName = process.env.MYSQL_USERNAME;
const dbPassword = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Buyers = require('./Buyers')(sequelize, Sequelize.DataTypes);
db.Products = require('./Products')(sequelize, Sequelize.DataTypes);

module.exports = db;
