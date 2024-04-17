import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:P3aceonurt%23@localhost:5432/wedding_app');

const EverybodyElse = sequelize.define('EverybodyElse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selectedCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brideGroomOrMutual: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guestValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    plusOneSelected: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plusOneFirstName: {
        type: DataTypes.STRING,
    },
    plusOneLastName: {
        type: DataTypes.STRING,
    },
    plusOneValue: {
        type: DataTypes.DECIMAL,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
})

export default EverybodyElse;
