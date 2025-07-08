const { getAllBadgesService, getBadgeByIdService, getBadgesByUserIdService, addBadgeToUserService} = require("../services/badges.service")

const getAllBadges = async (req,res) => {
    try{

    const badges = await getAllBadgesService()
    //console.log("Badges fetched:", badges);
    return res.status(200).json({
        success: true,
        badges
    })
    }catch(err){
        console.error("Error in getAllBadges:", err);
        res.status(500).json({ error: "Internal server error", success:false });
    }
}

const getBadgetById = async (req,res) => {
    try{
        const badgeId = req.params.id;
        const badge = await getBadgeByIdService(badgeId);
        return res.status(200).json({
            success: true,
            badge: badge
        });

    }catch(e){
        console.error("Error in getBadgeById:", e);
        res.status(500).json({ error: "Internal server error", success:false });
    }
}

const getBadgesByUserId = async (req,res) => {
    try{
        //console.log("Fetching badges for user");
        const userId = req.params.id;
        //console.log("id: ", userId)
        const badges = await getBadgesByUserIdService(userId);
        return res.status(200).json({
            success: true,
            badges
        });
    }catch(e){
        console.error("Error in getBadgesByUserId:", e);
        res.status(500).json({ error: "Internal server error", success:false });
    }
}

const addBadgeToUser = async (req,res) => {
    try {
        //const userId = req.params.id;
        const userId = req.headers["user-id"];
        const badgeId = req.body.badgeId;

        const badge = await addBadgeToUserService(userId, badgeId);
        return res.status(200).json({
            success: true,
            badge
        });
    } catch (e) {
        console.error("Error in addBadgeToUser:", e);
        res.status(500).json({ error: "Internal server error", success:false });
    }
}




module.exports ={
    getAllBadges,
    getBadgetById,
    getBadgesByUserId,
    addBadgeToUser
}