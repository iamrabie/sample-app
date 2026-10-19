const bcryptjs = require("bcryptjs");

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
            data: userDetails,
            success: true,
            error: false,
        });

    } catch (err) {
        res.status(500).json({ 
            error: true, 
            message: err.message, 
            success: false, 
            data: null 
        });
    }
};


const handleLogin = (req , res , next) => {
    console.log("usr logn controller");
}

module.exports = { handleRegistration , handleLogin };
// exports.handleRegistration = handleRegistration;
