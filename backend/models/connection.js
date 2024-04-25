import 'dotenv/config'

import { Sequelize, DataTypes } from 'sequelize';
// console.log(process.env.DB_URI)

const sequelize = new Sequelize(process.env.DB_URI);


export default sequelize