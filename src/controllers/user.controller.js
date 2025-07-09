const { createUserService, getUserByIdService, loginService, updateUserService, updateCounterKilometerBestRhythmService } = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    //console.log("User created successfully:", req.body);
    const user = await createUserService(req.body);
    

    return res.status(201).json({
      message: "User created successfully",
      user,
      success: true
    });
  } catch (e) {
    //const status = e.message === "Experience level not found" ? 400 : 500;
    console.log("Error creating user:", e.message);
    return res.status(500).json({
      message: "Error creating user",
      error: e.message,
      success: false
    });
  }
};

const getUserById = async (req,res) => {
  try{
    const userId = req.params.id;

    const user = await getUserByIdService(userId);
    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }
    return res.status(200).json({
      message: "User found",
      user,
      success: true
    });
  }catch(error){
    console.log("Error getting user by ID:", error.message);
    return res.status(500).json({
      message: "Error getting user by ID",
      error: error.message,
      success: false
    });
  }
}

const login = async (req,res) => {
  try{
    const {email, password} = req.body;
    console.log("Login attempt with email:", email," ", password);

    const user = await loginService(email,password)

    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      user,
      success:true
    });
  }catch(error){
    console.log("Error logging in:", error.message);
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
      success: false
    });
  }
}

const deleteUser = async (req,res) => {
  try{
    const userId = req.params.id;

    const result = await deleteUserService(userId);
    if(!result){
      return res.status(404).json({
        message: "User not found"
      });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      result,
      success: true
    });
  }catch(error){
    console.log("Error deleting user:", error.message);
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
      success: false
    });
  }
}

const updateUserStats = async (req, res) => {
  try {
    const userId = req.params.id;
    const {weight, height} = req.body;

    const updatedUser = await updateUserService(userId, weight, height);
    return res.status(200).json({
      message: "User updated successfully",
      // user: updatedUser,
      success:true
    });
  } catch (error) {
    console.log("Error updating user:", error.message);
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
      success: false
    });
  }
};

// const updateTrainingCounter = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const updatedUser = await updateTrainingCounterService(userId);
//     return res.status(200).json({
//       message: "User training counter updated successfully",
//       // user: updatedUser,
//       success:true
//     });
//   } catch (error) {
//     console.log("Error updating training counter:", error.message);
//     return res.status(500).json({
//       message: "Error updating training counter",
//       error: error.message,
//       success: false
//     });
//   }
// };

// const updateKilometers = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { kilometers } = req.body;

//     const updatedUser = await updateKilometersService(userId, kilometers);
//     return res.status(200).json({
//       message: "User kilometres updated successfully",
//       // user: updatedUser,
//       success:true
//     });
//   } catch (error) {
//     console.log("Error updating kilometres:", error.message);
//     return res.status(500).json({
//       message: "Error updating kilometres",
//       error: error.message,
//       success: false
//     });
//   }
// };

// const updateBestRhythm = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { bestRhythm } = req.body;
//     //console.log("Best rhythm:", req.body);
//     const updatedUser = await updateBestRhythmService(userId, bestRhythm);
//     return res.status(200).json({
//       message: "User best rhythm updated successfully",
//       // user: updatedUser,
//       success:true
//     });
//   } catch (error) {
//     console.log("Error updating best rhythm:", error.message);
//     return res.status(500).json({
//       message: "Error updating best rhythm",
//       error: error.message,
//       success: false
//     });
//   }
// }

const updateCounterKilometerBestRhythm = async(req,res) => {
  console.log("updateCounterKilometerBestRhythm called with body:", req.body);
  try{
    const {rhythm, km} = req.body;
    const id = req.headers["user-id"];
    console.log("Updating user stats with ID:", id, "Rhythm:", rhythm, "Kilometers:", km);
    const userupdated = updateCounterKilometerBestRhythmService(id, rhythm, km)
    return res.json(200).json({
      message:"User was updated successfuly",
      userupdated,
      success: true
    })
  }catch(e){
    console.log("Error updating km, best rhythm and trainings: ", e.message)
    return res.status(500).json({
      message:"Error updating km, best rhythm and trainings",
      error: e.message,
      success: false
    })
  }
}



const validate = async (req,res) => {
  res.json({
    user:{
      id: req.user.id,
      rolesId: req.user.rolesId
    }
  })
}


module.exports = {
  createUser,
  getUserById,
  login,
  deleteUser,
  updateUserStats,
  // updateTrainingCounter,
  // updateKilometers,
  // updateBestRhythm,
  updateCounterKilometerBestRhythm,
  validate
};
