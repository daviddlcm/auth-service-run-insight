require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload")

const app = express();

const PORT = process.env.PORT || 3001;

// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "./promotions",
// }))

app.use(express.urlencoded({extended:false}))

const sequelize = require("./src/configs/db.sequelize.config")



app.use(morgan("dev"));

app.use(express.json());

const userRoutes = require("./src/routes/user.routes")
const friendRoutes = require("./src/routes/friends.routes");
const eventRoutes = require("./src/routes/events.routes");
const badgeRoutes = require("./src/routes/badges.routes");

app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/events", eventRoutes)
app.use("/badges", badgeRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});




async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync();
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();