const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/db.sequelize.config");

class Badges extends Model {}

Badges.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "badges",
    tableName: "badges",
    timestamps: true,
  }
);

module.exports = Badges;
