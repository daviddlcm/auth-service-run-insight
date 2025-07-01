const User = require("./user.model");
const UserStats = require("./user.stats.model");
const ExperienceLevel = require("./user.experience.model");
const Genders = require("./user.genders.model");
const Roles = require("./user.roles.model");

User.hasOne(UserStats, { foreignKey: "user_id", as: "stats" });
User.belongsTo(Genders, { foreignKey: "genderId", as: "gender" });
User.belongsTo(Roles, { foreignKey: "rolesId", as: "role" });

UserStats.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserStats.belongsTo(ExperienceLevel, { foreignKey: "exp_level_id", as: "expLevel" });
