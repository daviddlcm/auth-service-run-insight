const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/db.sequelize.config");

class Events extends Model {}

Events.init(
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    date_event: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    img_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "events",
    timestamps: true,
    tableName: "events",
  }
);

module.exports = Events;
