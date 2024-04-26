import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {

    class User extends Model {};

    User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },email: {
      type: DataTypes.STRING,
    },
    passwordDigest: {
        type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  } ,{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
})

return User;
}