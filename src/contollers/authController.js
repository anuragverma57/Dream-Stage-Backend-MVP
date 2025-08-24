const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { validateSignUpData, validateLogInData } = require("../utils/validation");
const { sanitizeUser } = require('../utils/sanitization');
const { errorResponse, successResponse } = require("../utils/response");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// REGISTER
const registerUser = async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password, role } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (existingUser) throw new Error("This Email is already in use, Try using another emailId");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            role
        })

        let newUser = await user.save();

        // Create a JWT token
        const token = await user.getJWT();
        // Setting the token in res
        res.cookie("token", token, { expires: new Date(Date.now() + (7 * 24 * 3600000)) }); // 7 days

        const sanitizedUser = sanitizeUser(newUser);
        res.json(successResponse(sanitizedUser));
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
};

// LOGIN
const loginUser = async (req, res) => {
    try {
        validateLogInData(req)
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await user.validatePassword(password);

        if (isCorrectPassword) {
            // Create a JWT token
            const token = await user.getJWT();
            // Setting the token in res
            res.cookie("token", token, { expires: new Date(Date.now() + (7 * 24 * 3600000)) }); // 7 days

            const sanitizedUser = sanitizeUser(user)
            res.status(200).json(successResponse(sanitizedUser));
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
};

// LOGOUT
const logOut = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });
        res.status(200).json(successResponse(null, "Logged Out Successfully"));
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

module.exports = { registerUser, loginUser, logOut };
