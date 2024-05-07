'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Guests', [
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        selectedCategory: 'Family',
        brideGroomOrMutual: 'Bride',
        guestValue: 150.00,
        plusOneSelected: 'Yes',
        plusOneFirstName: 'Bob',
        plusOneLastName: 'Johnson',
        plusOneValue: 75.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        selectedCategory: 'Friend',
        brideGroomOrMutual: 'Groom',
        guestValue: 200.00,
        plusOneSelected: 'No',
        plusOneFirstName: null,
        plusOneLastName: null,
        plusOneValue: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Guests', null, {});
  }
};

