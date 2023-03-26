const express = require("express");
const {
    createUser,
    loginUser
} = require("../controller/users.controller");
const validateUserFields = require("../middleware/userRegisterFieldsAnalyzer.middleware");

const userRouter = express.Router();

userRouter.post("/register", validateUserFields, createUser);
userRouter.post("/login", loginUser)

module.exports = userRouter