"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("user_stats", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      exp_level_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "experience_levels",
          key: "id",
        },
      },
      weight: Sequelize.DOUBLE,
      height: Sequelize.INTEGER,
      km_total: Sequelize.DOUBLE,
      best_rhythm: Sequelize.DOUBLE,
      training_counter: Sequelize.INTEGER,
      training_streak: Sequelize.INTEGER,
      recorded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("user_stats");
  },
};
