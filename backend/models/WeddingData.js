'use strict';
const {
  Model,
  sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeddingData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }, {
    sequelize,
    modelName: 'WeddingData',
  });
  return WeddingData;
};
