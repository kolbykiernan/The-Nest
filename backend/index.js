import express from "express";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './models/index.js'; // Importing db object

dotenv.config();
const app = express();      

app.set("view engine", "js");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Define middleware and routes here
import apiController from './controllers/index.js'
import defineCurrentUser from "./middleware/defineCurrentUser.js";
app.use(defineCurrentUser);
app.use('/api', apiController)

// Serve static files
const frontendBuildPath = new URL('file://' + path.resolve('../frontend/build'), import.meta.url).pathname;
app.use(express.static(frontendBuildPath));

// Serve the frontend app
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected");
    await db.sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Terminate the process on failure
  }
  console.log(`Server is running on port ${PORT}`);
});
