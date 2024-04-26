import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {

    class Guestlist extends Model {};

    Guestlist.init({
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
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
} ,{
    sequelize,
    modelName: 'Guestlist',
    tableName: 'Guestlist',
})

return Guestlist;
}

