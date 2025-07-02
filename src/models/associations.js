const User = require("./user.model");
const UserStats = require("./user.stats.model");
const ExperienceLevel = require("./user.experience.model");
const Genders = require("./user.genders.model");
const Roles = require("./user.roles.model");
const Events = require("./user.event.model")
const Follows = require("./user.follows.model");

User.hasOne(UserStats, { foreignKey: "user_id", as: "stats" });
User.belongsTo(Genders, { foreignKey: "genderId", as: "gender" });
User.belongsTo(Roles, { foreignKey: "rolesId", as: "role" });

UserStats.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserStats.belongsTo(ExperienceLevel, { foreignKey: "exp_level_id", as: "expLevel" });

User.hasMany(Events, { foreignKey: "user_id", as: "events" });
Events.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.belongsToMany(User,{
    through: "follows",
    foreignKey: "following_user_id",
    otherKey: "followed_user_id",
    as: "following"
})

Follows.belongsTo(User, {
  foreignKey: "followed_user_id",
  as: "followedUser",
});

Follows.belongsTo(User, {
  foreignKey: "following_user_id",
  as: "followingUser",
});
