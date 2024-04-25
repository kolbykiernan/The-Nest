import sequelize from "./connection.js";
import { Sequelize, DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },email: {
      type: DataTypes.STRING,
    },
    passwordDigest: {
        type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  })

export default User;