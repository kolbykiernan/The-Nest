import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:P3aceonurt%23@localhost:5432/wedding_app');

const Bridesmaids = sequelize.define('Bridesmaids', {
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
    plusOneSelectedBridesmaids: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plusOneFirstName: {
        type: DataTypes.STRING,
    },
    plusOneLastName: {
        type: DataTypes.STRING,
    },
    isAlsoInWeddingParty: {
        type: DataTypes.STRING,
    },
    plusOneValueBridesmaids: {
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

export default Bridesmaids;
