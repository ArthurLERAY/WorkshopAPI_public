'use strict';

const Tools = require('../utils/Tools');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipmentSuggests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Tools.uuid()
      },
      name: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      watts: {
        type: Sequelize.DOUBLE
      },
      ref: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      img: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      link: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      typeId: {
        type: Sequelize.UUID,
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('equipmentSuggests');
  }
};