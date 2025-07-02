const express = require("express")

const router = express.Router()

const friendController = require("../controllers/friend.controller")

router.post("/",friendController.addFriend)
router.get("/:id", friendController.getAllMyFriends)

module.exports = router;