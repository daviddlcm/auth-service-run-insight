const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload")

const eventsController = require("../controllers/events.controller");

router.get("/by/future", eventsController.getEventByFutureDate);

router.get("/", eventsController.getAllEvents);

router.post(
  "/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./promotions",
  }),
  eventsController.addEvent
);

router.get("/:id", eventsController.getEventById)

module.exports = router;
