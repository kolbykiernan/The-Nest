'use strict';
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Guestlist', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    selectedCategory: {
        type: Sequelize.STRING,
    },
    brideGroomOrMutual: {
        type: Sequelize.STRING,      
    },
    guestValue: {
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
  await queryInterface.dropTable('Guestlist');
}
};
