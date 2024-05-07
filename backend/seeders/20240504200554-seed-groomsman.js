'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groomsmans', [
      {
        firstName: 'John',
        lastName: 'Doe',
        selectedCategory: 'Best Man',
        plusOneSelected: 'Yes',
        plusOneFirstName: 'Jane',
        plusOneLastName: 'Doe',
        isAlsoInWeddingParty: 'No',
        plusOneValue: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Max',
        lastName: 'Smith',
        selectedCategory: 'Usher',
        plusOneSelected: 'No',
        plusOneFirstName: null,
        plusOneLastName: null,
        isAlsoInWeddingParty: 'Yes',
        plusOneValue: 0.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groomsmans', null, {});
  }
};
