import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class WeddingData extends Model {};

    WeddingData.init({
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
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
} ,{
    sequelize,
    modelName: 'WeddingData',
    tableName: 'WeddingData',
})

return WeddingData;
}
