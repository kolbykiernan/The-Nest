'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    static associate(models) {
      User.hasMany(models.Bridesmaid, { foreignKey: 'userId' });
      User.hasMany(models.Category, { foreignKey: 'userId' });
      User.hasMany(models.Groomsman, { foreignKey: 'userId' });
      User.hasMany(models.Guest, { foreignKey: 'userId' });
      User.hasMany(models.Guestlist, { foreignKey: 'userId' });
      User.hasMany(models.WeddingData, { foreignKey: 'userId' });
    }
  }
  User.init({
    userId: { 
      allowNull: false,
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordDigest: DataTypes.STRING  
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};