const express = require("express")

const router = express.Router()

const userController = require("../controllers/user.controller")

router.post("/", userController.createUser)

router.get("/:id", userController.getUserById)

router.post("/login", userController.login)

router.patch("/:id", userController.updateUserStats)




module.exports = router