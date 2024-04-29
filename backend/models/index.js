import fs from 'fs/promises'; // Using fs promises API
import path from 'path';

import Sequelize from 'sequelize';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const env = process.env.NODE_ENV || 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Reading through the models directory to import each model
try {
  const files = await fs.readdir(__dirname);
  for (const file of files) {
    if (file.endsWith('.js') && file !== path.basename(__filename)) {
      const model = await import(path.join(__dirname, file));
      db[model.default.name] = model.default;
    }
  }
} catch (error) {
  console.error('Error reading models directory:', error);
  process.exit(1); // Terminate the process on failure
}

// Associating models if they have an 'associate' method
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

// Assigning Sequelize instance and Sequelize module to the 'db' object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
