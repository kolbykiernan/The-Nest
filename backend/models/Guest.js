'use strict';
const {
  Model,
  sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};
