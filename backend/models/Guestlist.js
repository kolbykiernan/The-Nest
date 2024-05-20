'use strict';
const {
  Model,
  sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guestlist extends Model {

    static associate(models) {
      Guestlist.belongsTo(models.User, { foreignKey: 'userId' });

    }
  };
  Guestlist.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    selectedCategory: {
      type: DataTypes.STRING,
    },
    brideGroomOrMutual: {
      type: DataTypes.STRING,
    },
    guestValue: {
      type: DataTypes.DECIMAL,
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
    modelName: 'Guestlist',
  });
  return Guestlist;
};
