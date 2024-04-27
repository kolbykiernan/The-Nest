import express from "express";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { dirname } from "path";
import Sequelize from "sequelize";
dotenv.config();
import apiController from './controllers/index.js'
import defineCurrentUser from "./middleware/defineCurrentUser.js";

const app = express();      

app.set("view engine", "js");
app.use(cors());
app.use(express.json());
app.use(defineCurrentUser);

app.use('/api', apiController)

const sequelize = new Sequelize({
  host: process.env.DB_HOST,  
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
});

try {
    sequelize.authenticate() 
    console.log(`Connected with Sequelize at ${process.env.DB_URL}`)    
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
