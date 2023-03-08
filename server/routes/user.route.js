const express = require("express");
const { createUser } = require("../controller/users.controller");
const validateUserFields = require("../middleware/userRegisterFieldsAnalyzer.middleware");

const userRouter = express.Router();

userRouter.post("/register", validateUserFields, createUser);

module.exports=userRouter