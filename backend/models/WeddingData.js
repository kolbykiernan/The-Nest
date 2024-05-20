'use strict';
const {
  Model,
  sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeddingData extends Model {

    static associate(models) {
      WeddingData.belongsTo(models.User, { foreignKey: 'userId' });

    }
  };
  WeddingData.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brideFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brideLastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brideSelection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groomFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groomLastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groomSelection: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'WeddingData',
  });
  return WeddingData;
};
