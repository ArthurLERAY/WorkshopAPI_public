'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const re = await queryInterface.createTable('room_equipments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Tools.uuid()
      },
      roomId: {
        type: Sequelize.UUID
      },
      equipmentId: {
        type: Sequelize.UUID
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // re.associate = models => {
    //   re.hasMany(models.room);
    //   re.hasMany(models.equipment);
    // }

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('room_equipments');
  }
};