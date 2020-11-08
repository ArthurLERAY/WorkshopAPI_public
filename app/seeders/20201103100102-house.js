'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user_id = await queryInterface.rawSelect('Users', {}, ['id']);
    await queryInterface.bulkInsert('houses', [{
      id: Tools.uuid(),
      name: 'Maison 1',
      userId: user_id,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      name: 'Maison 2',
      userId: user_id,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('houses', null, {});
  }
};
