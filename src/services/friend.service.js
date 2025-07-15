const { User } = require("../models/index");
const { Genders } = require("../models/index");
const { UserStats } = require("../models/index");
const { ExperienceLevel } = require("../models/index");
const { Follows } = require("../models/index");

const addFriendService = async (userId, friendId) => {
  try {
    //console.log("Adding friend", userId, friendId);
    const following = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!following) {
      throw new Error("User not found");
    }
    const followed = await User.findOne({
      where: {
        id: friendId,
      },
    });
    if (!followed) {
      throw new Error("Friend not found");
    }
    // console.log("Following user:", following.dataValues);
    // console.log("Followed user:", followed.dataValues);
    const existingFollow = await Follows.findOne({
      where: {
        following_user_id: userId,
        followed_user_id: friendId,
      },
    });
    //console.log("Existing follow:", existingFollow);

    if (existingFollow) {
      throw new Error("You are already following this user");
    }
    await Follows.create({
      following_user_id: userId,
      followed_user_id: friendId,
    });
    await Follows.create({
      following_user_id: friendId,
      followed_user_id: userId,
    });
    return {
      message: "Friend added successfully",
    };
  } catch (error) {
    throw error;
  }
};

const getAllMyFriendsService = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: UserStats,
          as: "stats",
          attributes: ["km_total", "training_counter"]
        },
      ],
    });
    
    if (!user) {
      throw new Error("User not found");
    }

    // Obtener todos los amigos
    const friends = await Follows.findAll({
      where: {
        following_user_id: userId,
      },
      include: [
        {
          model: User,
          as: "followedUser",
          attributes: ["id", "username", "email"],
          include: [
            {
              model: UserStats,
              as: "stats",
              attributes: ["km_total", "training_counter"]
            },
          ],
        },
      ],
    });

    // Crear el array con el usuario actual y sus amigos
    const allUsers = [
      // Incluir el usuario actual
      {
        id: user.id,
        username: user.username,
        email: user.email,
        stats: user.stats,
      },
      // Incluir todos los amigos
      ...friends.map((friend) => ({
        id: friend.followedUser.id,
        username: friend.followedUser.username,
        email: friend.followedUser.email,
        stats: friend.followedUser.stats,
      })),
    ];

    // Ordenar por km_total DESC, y en caso de empate por training_counter ASC
    allUsers.sort((a, b) => {
      const kmA = a.stats?.km_total || 0;
      const kmB = b.stats?.km_total || 0;
      const trainingA = a.stats?.training_counter || 0;
      const trainingB = b.stats?.training_counter || 0;

      // Primero ordenar por km_total descendente
      if (kmA !== kmB) {
        return kmB - kmA;
      }
      
      // Si tienen los mismos km, ordenar por training_counter ascendente
      // (menos entrenamientos primero)
      return trainingA - trainingB;
    });

    return allUsers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addFriendService,
  getAllMyFriendsService,
};
