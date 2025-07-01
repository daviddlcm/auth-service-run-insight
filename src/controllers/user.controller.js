const { createUserService } = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    //console.log("User created successfully:", req.body);
    const user = await createUserService(req.body);
    

    return res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (e) {
    //const status = e.message === "Experience level not found" ? 400 : 500;
    console.log("Error creating user:", e.message);
    return res.status(500).json({
      message: "Error creating user",
      error: e.message
    });
  }
};

module.exports = {
  createUser
};
