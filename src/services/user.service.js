const { User } = require("../models/index");
const { Genders } = require("../models/index");
const { UserStats } = require("../models/index");
const { ExperienceLevel } = require("../models/index");
const { Follows } = require("../models/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const createUserService = async (data) => {
  const t = await User.sequelize.transaction();
  try {
    const { name, email, password, username, gender, birthdate, user_stats } =
      data;

    const genderFound = await Genders.findOne({
      where: { gender },
    });

    const user = await User.create(
      {
        name,
        email,
        password,
        username,
        genderId: genderFound?.dataValues.id || 5,
        rolesId: 2,
        birthdate,
      },
      { transaction: t }
    );
    //console.log(user.dataValues)

    if (user_stats?.exp_level) {
      const expLevel = await ExperienceLevel.findOne({
        where: { name: user_stats.exp_level },
      });
      //console.log(expLevel)

      if (!expLevel) {
        throw new Error("Experience level not found");
      }
      //console.log(expLevel.dataValues)

      await UserStats.create(
        {
          user_id: user.dataValues.id,
          exp_level_id: expLevel.dataValues.id,
          weight: user_stats.weight || 0,
          height: user_stats.height || 0,
          km_total: user_stats.km_total || 0,
          best_rhythm: user_stats.best_rhythm || 0,
          training_counter: user_stats.training_counter || 0,
          training_streak: user_stats.training_streak || 0,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const getUserByIdService = async (id) => {
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: UserStats,
          as: "stats",
        },
      ],
    });
    const gender = await getGender(user.genderId);
    //console.log(gender)
    const expLevel = await getExperienceLevel(user.stats.exp_level_id);
    //console.log(expLevel)

    if (!user) {
      throw new Error("User not found");
    }
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      birthdate: user.birthdate,
      gender: gender,
      stats: {
        exp_level: expLevel,
        weight: user.stats.weight,
        height: user.stats.height,
        km_total: user.stats.km_total,
        best_rhythm: user.stats.best_rhythm,
        training_counter: user.stats.training_counter,
        training_streak: user.stats.training_streak,
      },
    };

    return newUser;
  } catch (error) {
    throw error;
  }
};

const getGender = async (id) => {
  const gender = await Genders.findByPk(id);
  return gender.gender;
};

const getExperienceLevel = async (id) => {
  const expLevel = await ExperienceLevel.findByPk(id);
  return expLevel.name;
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: email }],
      },
    });
    //console.log(user)
    if (!user) {
      throw new Error("something went wrong");
    }
    if (!user.validatePassword(password)) {
      throw new Error("something went wrong");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      id: user.id,
      token: token,
      rolesId: user.rolesId,
    };
  } catch (error) {
    throw error;
  }
};

const deleteUserService = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

const updateUserService = async (id, weight, height) => {
  const t = await UserStats.sequelize.transaction();
  try {
    const user = await UserStats.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    //console.log

    const updatedUser = await UserStats.update(
      { weight, height },
      {
        where: { id },
        returning: true,
        transaction: t,
      }
    );
    await t.commit();
    //console.log(updatedUser)

    return updatedUser;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};



module.exports = {
  createUserService,
  getUserByIdService,
  loginService,
  deleteUserService,
  updateUserService,
};
