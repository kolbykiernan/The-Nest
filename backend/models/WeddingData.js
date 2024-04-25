import sequelize from "./connection.js";
import { Sequelize, DataTypes } from 'sequelize';

const WeddingData = sequelize.define('WeddingData', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
})

export default WeddingData;
