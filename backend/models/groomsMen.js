import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {

    class Groomsmen extends Model {};

    Groomsmen.init({
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
    isAlsoInWeddingParty: {
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
    modelName: 'Groomsmen',
    tableName: 'Groomsmens',
})

return Groomsmen;
}