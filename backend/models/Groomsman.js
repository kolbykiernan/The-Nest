'use strict';
const {
  Model,
  sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groomsman extends Model {
  
    static associate(models) {
      Groomsman.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Groomsman.init({
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    modelName: 'Groomsman',
  });
  return Groomsman;
};
