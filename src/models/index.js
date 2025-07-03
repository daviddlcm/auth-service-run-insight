const User = require("./user.model");
const UserStats = require("./user.stats.model");
const ExperienceLevel = require("./user.experience.model");
const Genders = require("./user.genders.model");
const Roles = require("./user.roles.model");
const Events = require("./user.events.model");
const Follows = require("./user.follows.model");


require("./associations");

module.exports = {
  User,
  UserStats,
  ExperienceLevel,
  Genders,
  Roles,
  Events,
  Follows
};
// 