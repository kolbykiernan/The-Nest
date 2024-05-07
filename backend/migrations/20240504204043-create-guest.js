'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
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
      brideGroomOrMutual: {
        type: Sequelize.STRING
      },
      guestValue: {
        type: Sequelize.DECIMAL
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
      plusOneValue: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Guests');
  }
};