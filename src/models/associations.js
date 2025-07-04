const User = require("./user.model");
const UserStats = require("./user.stats.model");
const ExperienceLevel = require("./user.experience.model");
const Genders = require("./user.genders.model");
const Roles = require("./user.roles.model");
const Events = require("./user.events.model");
const Follows = require("./user.follows.model");
const UserBadges = require("./user.badges.model");
const Badges = require("./badges.model");

User.hasOne(UserStats, { foreignKey: "user_id", as: "stats" });
User.belongsTo(Genders, { foreignKey: "genderId", as: "gender" });
User.belongsTo(Roles, { foreignKey: "rolesId", as: "role" });

UserStats.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserStats.belongsTo(ExperienceLevel, {
  foreignKey: "exp_level_id",
  as: "expLevel",
});

User.hasMany(Events, { foreignKey: "id_user", as: "events" });
Events.belongsTo(User, { foreignKey: "id_user", as: "user" });

// User.belongsToMany(Badges, {foreignKey: "id_user", through: UserBadges, as: "badges" });
// UserBadges.belongsTo(User, { foreignKey: "id_user", as: "user" });
// Badges.belongsToMany(User, {foreignKey: "id_badge", through: UserBadges, as: "users" });

User.belongsToMany(Badges, {
  through: UserBadges,
  foreignKey: "id_user",
  otherKey: "id_badge",
  as: "badges",
});

Badges.belongsToMany(User, {
  through: UserBadges,
  foreignKey: "id_badge",
  otherKey: "id_user",
  as: "users",
});



// UserBadges.belongsTo(User, {
//   foreignKey: "id_user",
// });
// UserBadges.belongsTo(Badges, {
//   foreignKey: "id_badge",
// });
// User.hasMany(UserBadges, { foreignKey: "id_user" });
// Badges.hasMany(UserBadges, { foreignKey: "id_badge" });



User.belongsToMany(User, {
  through: "follows",
  foreignKey: "following_user_id",
  otherKey: "followed_user_id",
  as: "following",
});

Follows.belongsTo(User, {
  foreignKey: "followed_user_id",
  as: "followedUser",
});

Follows.belongsTo(User, {
  foreignKey: "following_user_id",
  as: "followingUser",
});
