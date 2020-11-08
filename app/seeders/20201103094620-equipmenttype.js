'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user_id = await queryInterface.rawSelect('Users', {}, ['id']);
    await queryInterface.bulkInsert('equipmentTypes', [{
      id: Tools.uuid(),
      label: 'Lave-linge',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      label: 'Inconnu',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }
    , {
      id: Tools.uuid(),
      label: 'Lampes haute intensité',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      label: 'Lampes basse intensité',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      label: 'Four',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipmentTypes', null, {});
  }
};
