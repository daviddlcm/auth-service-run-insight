const User = require("./user.model");
const UserStats = require("./user.stats.model");
const ExperienceLevel = require("./user.experience.model");
const Genders = require("./user.genders.model");
const Roles = require("./user.roles.model");

require("./associations");

module.exports = {
  User,
  UserStats,
  ExperienceLevel,
  Genders,
  Roles,
};
// 