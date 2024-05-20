// server.js

const express = require('express');
const cors = require('cors');
const { DB_PORT } = require('./config/config');
require('dotenv').config();
const path = require("path");
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const defineCurrentUser = require('./middleware/defineCurrentUser');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(defineCurrentUser);
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Use routes
app.use('/api', userRoutes);

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});



// Start the server
const PORT = process.env.DB_PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully!');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  }); 
  