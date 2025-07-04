const express = require("express")

const router = express.Router()

const badgesController = require("../controllers/badges.controller")



router.get("/user/:id", badgesController.getBadgesByUserId)
router.post("/user", badgesController.addBadgeToUser)
router.get("/", badgesController.getAllBadges)
router.get("/:id", badgesController.getBadgetById)

module.exports = router