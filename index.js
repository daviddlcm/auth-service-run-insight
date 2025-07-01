require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3001;

const sequelize = require("./src/configs/db.sequelize.config")

app.use(morgan("dev"));

app.use(express.json());

const userRoutes = require("./src/routes/user.routes")

app.use("/users", userRoutes);



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