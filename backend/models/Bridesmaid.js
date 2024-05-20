'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bridesmaid extends Model {
   
    static associate(models) {
      Bridesmaid.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Bridesmaid.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    selectedCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plusOneSelected: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plusOneFirstName: {
      type: DataTypes.STRING
    },
    plusOneLastName: {
      type: DataTypes.STRING
    },
    isAlsoInWeddingParty: {
      type: DataTypes.STRING
    },
    plusOneValue: {
      type: DataTypes.DECIMAL
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Users', 
          key: 'userId' 
      }
  }
  }, {
    sequelize,
    modelName: 'Bridesmaid',
    timestamps: true
  });
  return Bridesmaid;
};
