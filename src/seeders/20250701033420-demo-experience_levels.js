'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("experience_levels", [
    {id:1, name:"Principiante", createdAt: new Date(), updatedAt: new Date()},
    {id:2, name:"Intermedio", createdAt: new Date(), updatedAt: new Date()},
    {id:3, name:"Avanzado", createdAt: new Date(), updatedAt: new Date()},
    {id:4, name:"Experto", createdAt: new Date(), updatedAt: new Date()},
    {id:5, name:"Maestro", createdAt: new Date(), updatedAt: new Date()},
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('experience_levels', null, {});
  }
};
