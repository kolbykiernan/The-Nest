'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WeddingData', [
      {
        brideFirstName: 'Alice',
        brideLastName: 'Smith',
        brideSelection: 'Friend',
        groomFirstName: 'John',
        groomLastName: 'Doe',
        groomSelection: 'Family',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brideFirstName: 'Mary',
        brideLastName: 'Johnson',
        brideSelection: 'Family',
        groomFirstName: 'Bob',
        groomLastName: 'Brown',
        groomSelection: 'Friend',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WeddingData', null, {});
  }
};
