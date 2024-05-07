'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bridesmaids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      selectedCategory: {
        type: Sequelize.STRING
      },
      plusOneSelected: {
        type: Sequelize.STRING
      },
      plusOneFirstName: {
        type: Sequelize.STRING
      },
      plusOneLastName: {
        type: Sequelize.STRING
      },
      isAlsoInWeddingParty: {
        type: Sequelize.STRING
      },
      plusOneValue: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bridesmaids');
  }
};
