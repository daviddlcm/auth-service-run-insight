const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/db.sequelize.config");

const User = require("./user.model");
const ExperienceLevel = require("./user.experience.model");


class UserStats extends Model {}

UserStats.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: "User",
      key: "id",
    },
  },
  exp_level_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: "ExperienceLevel",
      key: "id",
    },
  },
  weight: DataTypes.DOUBLE,
  height: DataTypes.INTEGER,
  km_total: DataTypes.DOUBLE,
  best_rhythm: DataTypes.DOUBLE,
  training_counter: DataTypes.INTEGER,
  training_streak: DataTypes.INTEGER,
  recorded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: "UserStats",
  tableName: "user_stats",
  timestamps: false,
});

// UserStats.belongsTo(User, { foreignKey: "user_id", as:"user" } );
// UserStats.belongsTo(ExperienceLevel,{ foreignKey: "exp_level_id", as:"expLevel" });

module.exports = UserStats;