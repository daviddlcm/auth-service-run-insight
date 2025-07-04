const { DataTypes, Model } = require("sequelize");

const sequelize = require("../configs/db.sequelize.config");

class UserBadges extends Model {}

UserBadges.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    id_badge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "badges",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "user_badges",
    tableName: "user_badges",
    timestamps: true,
  }
);

module.exports = UserBadges;
