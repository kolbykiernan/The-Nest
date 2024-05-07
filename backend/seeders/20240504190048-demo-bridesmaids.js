'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bridesmaids', [{
      firstName: 'Jane',
      lastName: 'Doe',
      selectedCategory: 'Friend',
      plusOneSelected: 'Yes',
      plusOneFirstName: 'John',
      plusOneLastName: 'Smith',
      isAlsoInWeddingParty: 'No',
      plusOneValue: 100.50,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bridesmaids', null, {});
  }
};
