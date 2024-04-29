'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groomsmen', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    selectedCategory: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    plusOneSelected: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    plusOneFirstName: {
        type: Sequelize.STRING,
    },
    plusOneLastName: {
        type: Sequelize.STRING,
    },
    isAlsoInWeddingParty: {
        type: Sequelize.STRING,
    },
    plusOneValue: {
        type: Sequelize.DECIMAL,
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
  await queryInterface.dropTable('Groomsmen');
}
};
