const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const AppError = require("../utils/error");

const handleRegistration = async (req, res, next) => {
  const { name, email, password, token } = req.body;

  try {
    if (!name || !email || !password) {
      throw new AppError(500, "Please fill all the required fields.");
    }

    let userExistsAlready = await User.findOne({ email });

    if (userExistsAlready) {
      throw new AppError(409, "This Email is already in use.");
    }

    let hashedPassword = await bcryptjs.hash(password, 10);

    let userDetails = new User({
      name,
      email,
      password: hashedPassword,
    });

    await userDetails.save();

    res.status(201).json({
      message: "User is registered successfully.",
      data: {
        id:userDetails._id,
        ...userDetails
      },
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
      success: false,
      data: null,
    });
  }
};

const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new AppError(400, "Please fill all the required fields.");
    }
    let doesUserExists = await User.findOne({ email });

    if (!doesUserExists) {
      //setting the status code from 404 to 401 so the hacker cant find what give 401 and what gives 404
      throw new AppError(401, "User does not exists");
    }

    let doesPasswordMatch = await bcryptjs.compare(
      password,
      doesUserExists?.password,
    );

    if (!doesPasswordMatch) {
      throw new AppError(401, "Invalid Credentials.");
    }

    let token = jwt.sign(
      {
        _id: doesUserExists._id,
        email: doesUserExists.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    doesUserExists.token = token;
    await doesUserExists.save();

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        id: doesUserExists._id,
        email: doesUserExists.email,
        name: doesUserExists.name,
        token: doesUserExists.token,
      },
      success: true,
      error: null,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      data: null,
      success: false,
      error: true,
    });
  }
};

const handleGetAllUsers = async (req , res , next) => {

  try {
    const allUsers = await User.find();
    console.log(allUsers);

    if (allUsers.length == 0) {
      return res.status(200).json({  
      message: "No users found",
      data: allUsers,
      success: true,
      error: null
    });

    }

    res.status(200).json({  
      message: "All users fetched successfully",
      data: allUsers,
      success: true,
      error: null
    });
  }

  catch(err) {
    console.log("err message" , err.message);
  }
};

module.exports = { handleRegistration, handleLogin, handleGetAllUsers};
// exports.handleRegistration = handleRegistration;
