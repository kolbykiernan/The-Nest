'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Guestlists', [
      {
        firstName: 'Emily',
        lastName: 'Rogers',
        selectedCategory: 'Friend',
        brideGroomOrMutual: 'Bride',
        guestValue: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Lucas',
        lastName: 'Morris',
        selectedCategory: 'Family',
        brideGroomOrMutual: 'Groom',
        guestValue: 120.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Guestlists', null, {});
  }
};
