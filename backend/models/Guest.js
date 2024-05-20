'use strict';
const {
  Model,
  sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    static associate(models) {
      Guest.belongsTo(models.User, { foreignKey: 'userId' });

    }
  };
  Guest.init({
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
    brideGroomOrMutual: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guestValue: {
      type: DataTypes.DECIMAL,
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
    modelName: 'Guest',
  });
  return Guest;
};
