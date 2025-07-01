const {User} = require("../models/index");
const {Genders} = require("../models/index");
const {UserStats} = require("../models/index");
const {ExperienceLevel} = require("../models/index");

const createUserService = async (data) => {
  const t = await User.sequelize.transaction();
  try {
    const {
      name,
      email,
      password,
      username,
      gender,
      birthdate,
      user_stats
    } = data;

    const genderFound = await Genders.findOne({
      where: { gender }
    });

    const user = await User.create({
      name,
      email,
      password,
      username,
      genderId: genderFound?.dataValues.id || 5, // fallback si no encuentra el género
      rolesId: 2,
      birthdate,
    }, { transaction: t });
    //console.log(user.dataValues)

    if (user_stats?.exp_level) {
      const expLevel = await ExperienceLevel.findOne({
        where: { name: user_stats.exp_level }
      });
      //console.log(expLevel)

      if (!expLevel) {
        throw new Error("Experience level not found");
      }
      //console.log(expLevel.dataValues)

      const result = await UserStats.create({
        user_id: user.dataValues.id,
        exp_level_id: expLevel.dataValues.id,
        weight: user_stats.weight || 0,
        height: user_stats.height || 0,
        km_total: user_stats.km_total || 0,
        best_rhythm: user_stats.best_rhythm || 0,
        training_counter: user_stats.training_counter || 0,
        training_streak: user_stats.training_streak || 0,
      }, { transaction: t });

      //console.log(result.dataValues);

    }

    await t.commit();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username
    };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  createUserService
};
