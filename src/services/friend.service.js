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
    });
    if (!user) {
      throw new Error("User not found");
    }
    //console.log("User found:", user.dataValues);
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
      order: [
        [
          { model: User, as: "followedUser" },
          { model: UserStats, as: "stats" },
          "km_total",
          "DESC",
        ],
      ],
    });

    return [
      ...friends.map((friend) => ({
        id: friend.followedUser.id,
        username: friend.followedUser.username,
        email: friend.followedUser.email,
        stats: friend.followedUser.stats,
      })),
    ];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addFriendService,
  getAllMyFriendsService,
};
