const express = require("express");
const authController = require("../contollers/authController");

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", authController.logOut);

module.exports = authRouter;
