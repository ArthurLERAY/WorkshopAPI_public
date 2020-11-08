'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const house = await queryInterface.createTable('houses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Tools.uuid()
      },
      name: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    house.associate = models => {
      house.belongsTo(models.user);
      house.hasMany(models.room);
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('houses');
  }
};
