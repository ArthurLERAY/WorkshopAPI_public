'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const equipment_id = await queryInterface.rawSelect("equipmentTypes", {where: {label: "Lampes haute intensité"}}, ['id']);

    return queryInterface.bulkInsert('equipment', [{
      id: Tools.uuid(),
      name: "Ampoule",
      watts: 10.00,
      typeId: equipment_id,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      name: 'Ampoule LED',
      watts: 7.00,
      typeId: equipment_id,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('equipment', null, {});
  }
};
