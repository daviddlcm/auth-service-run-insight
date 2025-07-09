const { User } = require("../models/index");
const { Genders } = require("../models/index");
const { UserStats } = require("../models/index");
const { ExperienceLevel } = require("../models/index");
const { Follows } = require("../models/index");
const { Events } = require("../models/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../configs/cloudinary.config");
const fs = require("fs-extra");

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

    if (!user) {
      throw new Error("User not found");
    }
    const gender = await getGender(user.genderId);
    //console.log(gender)
    const expLevel = await getExperienceLevel(user.stats.exp_level_id);
    //console.log(expLevel)

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
    //console.log("Login attempt with email:", email, " ", password);
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: email }],
      },
    });
    //console.log(user)
    if (!user) {
      throw new Error("User or password incorrect");
    }
    if (!user.validatePassword(password)) {
      throw new Error("User or password incorrect");
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

// const updateTrainingCounterService = async (id) => {
//   try{
//     const user = await UserStats.findByPk(id);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     //console.log(user)

//     const updatedUser = await UserStats.update(
//       { training_counter: user.training_counter + 1 },
//       {
//         where: { id },
//         returning: true,
//       }
//     );
//     //console.log(updatedUser)

//     return updatedUser;
//   }catch(error){
//     throw error;
//   }
// }

// const updateKilometersService = async (id, km) => {
//   //console.log(id, km)
//   const t = await UserStats.sequelize.transaction();
//   try {
//     const user = await UserStats.findByPk(id);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     //console.log(user)

//     const updatedUser = await UserStats.update(
//       { km_total: user.km_total + km },
//       {
//         where: { id },
//         returning: true,
//         transaction: t,
//       }
//     );
//     await t.commit();
//     //console.log(updatedUser)

//     return updatedUser;
//   } catch (error) {
//     await t.rollback();
//     throw error;
//   }
// };

// const updateBestRhythmService = async (id, rhythm) => {
//   const t = await UserStats.sequelize.transaction();
//   try {
//     const user = await UserStats.findByPk(id);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     // console.log(user.best_rhythm)
//     // console.log(rhythm)
//     if (user.best_rhythm >= rhythm) {
//       //t.rollback()
//       throw new Error("New rhythm is not better than the current best rhythm");
//     }

//     const updatedUser = await UserStats.update(
//       { best_rhythm: rhythm },
//       {
//         where: { id },
//         returning: true,
//         transaction: t,
//       }
//     );
//     await t.commit();
//     //console.log(updatedUser)

//     return updatedUser;
//   } catch (error) {
//     await t.rollback();
//     throw error;
//   }
// };

const updateCounterKilometerBestRhythmService = async (id, rhythm, km) => {
  //const t = await UserStats.sequelize.transaction()
  try {
    const user = await UserStats.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    // if(user.best_rhythm >= rhythm){
    //   throw new Error("New rhythm is not better than the current best rhythm")
    // }
    const updateUser = UserStats.update(
      {
        best_rhythm: rhythm,
        km_total: user.km_total + km,
        training_counter: user.training_counter + 1,
      },
      {
        where: { id },
        returning: true,
      }
    );
    return updateUser;
  } catch (e) {
    //await t.rollback()
    throw e;
  }
};

module.exports = {
  createUserService,
  getUserByIdService,
  loginService,
  deleteUserService,
  updateUserService,
  updateCounterKilometerBestRhythmService,
  // updateTrainingCounterService,
  // updateKilometersService,
  // updateBestRhythmService
};
