import fs from 'fs';
import path from 'path';
import config from '../config/config.json'
import Sequelize from 'sequelize';

const __filename = path.basename(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];



const sequelize = new Sequelize(config.database, config.username, config.password, config, {
  host: config.host,
  dialect: 'postgres',
});


const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== __filename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = import(path.join(__dirname, file)).then(module => module.default);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
