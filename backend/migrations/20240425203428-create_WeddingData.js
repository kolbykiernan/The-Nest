'use strict';
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WeddingData', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    brideFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brideLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brideSelection: {
        type: Sequelize.STRING,
        allowNull: false
    },
    groomFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    groomLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    groomSelection: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('WeddingData');
}
};
