const { Op } = require("sequelize");
const User = require("../models/UserModel");
const generateUserId = require("../Utils/GenerateUserId");
const { checkPassword, hashPassword } = require("../Utils/HashPassword");

//-------------------------user registration--------------------------
module.exports.registerUser = async (req, res) => {
  console.log("Register user");
  try {
    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });
    const existingNic = await User.findOne({
      where: { nic: req.body.nic },
    });
    if (existingEmail) {
      //check existing email
      return res.status(400).json({
        success: false,
        message: "Email Already Exists. Try Different One.",
      });
    } else if (existingNic) {
      //check existing nic
      return res.status(400).json({
        success: false,
        message: "NIC Already Exists. Try Different One.",
      });
    }
    const newUser = new User(req.body);
    newUser.password = await hashPassword(newUser.password); //encrypt the password
    newUser.userID = (
      await generateUserId(newUser.nic, newUser.userRole)
    ).toString();

    const savedUSer = await User.create(newUser.dataValues); //save user to the database

    const { password, ...other } = savedUSer.dataValues;
    res.status(200).json({
      success: true,
      message: "User Registered Successfully.",
      user: other,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User Registration failed",
      error: error.message,
    });
  }
};

//-------------------------user login--------------------------
module.exports.loginUser = async (req, res) => {
  console.log("Login user");
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (!existingUser) {
      //check existing userID
      return res.status(404).json({
        success: false,
        message: "UserID does not Exists. Check again.",
      });
    } else if (!checkPassword(req.body.password, existingUser.password)) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const { password, ...other } = existingUser.dataValues;
    res.status(200).json({
      success: true,
      message: "User login Successfully.",
      user: other,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User login failed",
      error: error.message,
    });
  }
};


//-------------------------user update--------------------------
module.exports.updateUser = async (req, res) => {
  console.log("Update user");
  try {
    const existingEmail = await User.findOne({
      where: {userID: { [Op.ne]: req.body.userID }, email: req.body.email },
    });
    const existingNic = await User.findOne({
      where: {userID: {  [Op.ne]: req.body.userID }, nic: req.body.nic },
    });
    if (existingEmail) {
      //check existing email
      return res.status(400).json({
        success: false,
        message: "Email Already Exists. Try Different One.",
      });
    } else if (existingNic) {
      //check existing nic
      return res.status(400).json({
        success: false,
        message: "NIC Already Exists. Try Different One.",
      });
    }
    const result = await User.update(req.body, {
      where: { userID: req.params.userID },
    });

    if (result[0] == 1) {
      res.status(200).json({
        success: true,
        message: "User updated Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User update failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User Update failed",
      error: error.message,
    });
  }
};
