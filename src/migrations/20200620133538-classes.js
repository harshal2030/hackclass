'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return (queryInterface.addConstraint('classes', ['className'], {
     type: 'unique',
     name: 'classname_unique_key'
   }))
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return (queryInterface.removeConstraint('classes', 'classname_unique_key'))
  }
};
