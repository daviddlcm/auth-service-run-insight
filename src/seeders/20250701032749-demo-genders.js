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
   await queryInterface.bulkInsert("Genders", [
    {id:1, gender: "Masculino", createdAt: new Date(), updatedAt: new Date()},
    {id:2, gender: "Femenino", createdAt: new Date(), updatedAt: new Date()},
    {id:3, gender: "No binario", createdAt: new Date(), updatedAt: new Date()},
    {id:4, gender: "Otro", createdAt: new Date(), updatedAt: new Date()},
    {id:5, gender: "Prefiero no decirlo", createdAt: new Date(), updatedAt: new Date()}
   ] )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Genders", null, {})
  }
};
