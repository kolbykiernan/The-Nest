import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:P3aceonurt%23@localhost:5432/wedding_app');

const SideBar = sequelize.define('SideBar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

export default SideBar;
