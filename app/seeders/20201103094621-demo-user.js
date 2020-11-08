'use strict';

const Tools = require('../utils/Tools');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: Tools.uuid(),
      email: 'aaaa@exemple.fr',
      password: 'bd0a66361a2aec0054fae4d02f3a593a',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
