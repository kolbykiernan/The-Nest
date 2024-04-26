import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {

    class EverybodyElse extends Model {};

    EverybodyElse.init({
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
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
} ,{
    sequelize,
    modelName: 'EverybodyElse',
    tableName: 'EverybodyElses'
})

return EverybodyElse;
}