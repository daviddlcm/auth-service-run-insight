const { addFriendService, getAllMyFriendsService } = require("../services/friend.service");

const addFriend = async (req,res) => {
  try{
    const {userId, friendId} = req.body;

    const result = await addFriendService(userId, friendId);
    if(!result){
      return res.status(404).json({
        message: "User or friend not found"
      });
    }
    return res.status(200).json({
      message: "Friend added successfully",
      success: true
    });
  }catch(error){
    console.log("Error adding friend:", error.message);
    return res.status(500).json({
      message: "Error adding friend",
      error: error.message,
      success: false
    });
  }
}
const getAllMyFriends = async(req,res) => {
    try{
        const userId = req.params.id;
        //console.log("Getting friends for user:", userId);
        const friends = await getAllMyFriendsService(userId);
        if(!friends){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Friends retrieved successfully",
            friends,
            success: true
        });
    }catch(error){
        console.log("Error getting friends:", error.message);
        return res.status(500).json({
            message: "Error getting friends",
            error: error.message,
            success: false
        });
    }
}

module.exports = {
    addFriend,
    getAllMyFriends
}