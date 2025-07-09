const express = require("express")

const router = express.Router()

const userController = require("../controllers/user.controller")

const {authenticateToken} = require("../middlewares/auth.middleware")

router.patch("/stats",userController.updateCounterKilometerBestRhythm)

router.post("/", userController.createUser)

router.get("/:id", userController.getUserById)

router.post("/login", userController.login)

router.patch("/:id", userController.updateUserStats)

// router.patch("/training/:id", userController.updateTrainingCounter)

// router.patch("/kilometers/:id", userController.updateKilometers)

// router.patch("/best-rhythm/:id", userController.updateBestRhythm)

//router.post("/event/:id", userController.addEvent)


router.get("/validate/token", authenticateToken ,userController.validate)

module.exports = router