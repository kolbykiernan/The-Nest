import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:P3aceonurt%23@localhost:5432/wedding_app');

const WeddingData = sequelize.define('WeddingData', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invites: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    attendance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
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