// Backend index.js

import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();
import Sequelize from "sequelize";
import apiController from './controllers/index.js'
import defineCurrentUser from "./middleware/defineCurrentUser.js";

const app = express();

app.set("view engine", "js");
app.use(cors());
app.use(express.json());
app.use(defineCurrentUser);
app.use('/api', apiController)


// SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.DB_URI) 

try {
    sequelize.authenticate() 
    console.log(`Connected with Sequelize at ${process.env.DB_URI}`) 
} catch(error) {
    console.log(`Unable to connect to PG: ${error}`) 
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Private-Network", "true");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`)
})

export default app;
