const { Badges, UserBadges, User } = require("../models/index");


const getAllBadgesService = async () => {
    try {
        //console.log("Fetching all badges service");
        const badges = await Badges.findAll()
        //console.log("Badges fetched:", badges);
        return badges;
    }catch(e){
        throw new Error("Error fetching badges: " + e.message);
    }
}

const getBadgeByIdService = async (badgeId) => {
    try {
        const badge = await Badges.findByPk(badgeId);
        if (!badge) {
            throw new Error("Badge not found");
        }
        return badge;
    } catch (e) {
        throw new Error("Error fetching badge: " + e.message);
    }
}

const getBadgesByUserIdService = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [{model: Badges, as: "badges"}]
        });
        if (!user) {
            throw new Error("User not found");
        }

        // const userBadges = await UserBadges.findAll({
        //     where: { userId },
        //     include: [{ model: Badges, as:"badges" }]
        // });
        //console.log(user.badges)

        return user.badges
    } catch (e) {
        throw new Error("Error fetching badges for user: " + e.message);
    }
}

const addBadgeToUserService = async (userId, badgeId) => {
    const t = await User.sequelize.transaction();
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const badge = await Badges.findByPk(badgeId);
        if (!badge) {
            throw new Error("Badge not found");
        }

        const userBadge = await UserBadges.create(
            { id_user: userId, id_badge: badgeId },
            { transaction: t }
        );

        await t.commit();
        return userBadge;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}



module.exports ={
    getAllBadgesService,
    getBadgeByIdService,
    getBadgesByUserIdService,
    addBadgeToUserService
}
