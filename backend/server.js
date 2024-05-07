// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully!');
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
