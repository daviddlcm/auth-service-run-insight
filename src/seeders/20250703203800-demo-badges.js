"use strict";

const { create } = require("../models/user.genders.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("badges", [
      {
        id: 1,
        name: "5K Explorer",
        description: "Corre al menos 5 km en una semana.",
        url_icon: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "10K Challenger",
        description: "Corre al menos 10 km en una semana.",
        url_icon: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "15K Warrior",
        description: "Corre al menos 15 km en una semana.",
        url_icon: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "20K Beast Mode",
        description: "Corre al menos 20 km en una semana.",
        url_icon: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Maratón Virtual",
        description: "Corre 42 km acumulados en una semana.",
        url_icon: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Ultracorredor",
        description: "Corre más de 50 km en una sola semana.",
        url_icon: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("badges", null, {});
  },
};
