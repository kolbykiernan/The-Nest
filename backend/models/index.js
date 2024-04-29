import fs from 'fs'; 
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const env = process.env.NODE_ENV || 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);

// Importing configuration from the config file
import config from '../config/config.js';

// Creating Sequelize instance with database connection options
const sequelize = new Sequelize({
  host: 'dpg-commhai1hbls73f6eb2g-a.oregon-postgres.render.com',
  port: '5432',
  username: 'the_nest_postgresql_3jqr_user',
  password: '6eTfpvrYNwAVOntK2kewNsu0eSqY5wsy',
  database: 'the_nest_postgresql_3jqr',
  dialect: 'postgres', 
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Authenticating Sequelize instance 
try { 
  await sequelize.authenticate();
  console.log('Connected to Render database successfully');
} catch (error) {
  console.error('Unable to connect to Render database:', error);
  process.exit(1); // Terminate the process on failure
}

// Creating an empty object to store Sequelize models
const db = {};
const files = await fs.promises.readdir(__dirname);
for (const file of files) {
    if (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    ) {
        const { default: model } = await import(path.join(__dirname, file));
        db[model.name] = model(sequelize, Sequelize.DataTypes);
    }
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Assigning Sequelize instance and Sequelize module to the 'db' object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
