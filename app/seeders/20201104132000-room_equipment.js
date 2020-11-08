'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const equipment_id = await queryInterface.rawSelect('equipment', {where: {name: "Ampoule"}}, ['id']);
    const equipment2_id = await queryInterface.rawSelect('equipment', {where: {name: "Ampoule LED"}}, ['id']);
    const room_id = await queryInterface.rawSelect('rooms', {}, ['id']);


    await queryInterface.bulkInsert('room_equipments', [{
      id: Tools.uuid(),
      roomId: room_id,
      equipmentId: equipment_id,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      roomId: room_id,
      equipmentId: equipment2_id,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('room_equipments', null, {});
  }
};
