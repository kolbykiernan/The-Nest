import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:P3aceonurt%23@localhost:5432/wedding_app');

const Guestlist = sequelize.define('Guestlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
})

export default Guestlist;
