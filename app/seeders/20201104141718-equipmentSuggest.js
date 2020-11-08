'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const et_lampeHI = await queryInterface.rawSelect('equipmentTypes', {where: {
      label: 'Lampes haute intensité'
      }}, ['id']);

    const et_lampeBI = await queryInterface.rawSelect('equipmentTypes', {where: {
        label: 'Lampes basse intensité'
      }}, ['id']);

    const et_four = await queryInterface.rawSelect('equipmentTypes', {where: {
        label: 'Four'
      }}, ['id']);

    return queryInterface.bulkInsert('equipmentSuggests', [{
      id: Tools.uuid(),
      name: "Philips ampoule LED E27",
      brand: 'Samsung',
      watts: 175,
      ref: "8718696813812",
      link: "https://www.cdiscount.com/bricolage/electricite/philips-ampoule-led-standard-e27-19-5w-equiva/f-166141002-phi8718696813812.html",
      typeId: et_lampeHI,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }, {
      id: Tools.uuid(),
      name: "4 X E27 Ampoules LED 23W A65",
      brand: 'Techgomade',
      watts: 96,
      ref: "B07925DLLX",
      link: "https://www.amazon.fr/dp/B07925DLLX",
      typeId: et_lampeHI,
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('equipmentSuggests', null, {});
  }
};
