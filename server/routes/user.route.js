const express = require("express");
const {
    createUser,
    loginUser,
    getAllUsers,
    addUser,


} = require("../controller/users.controller");
const authenticateUser = require("../middleware/authontication.middleware");
const { SuperAdminAccess } = require("../middleware/authorised.middleware");
// const { SuperAdminAccess, adminAccess } = require("../middleware/authorised.middleware");
const validateUserFields = require("../middleware/userRegisterFieldsAnalyzer.middleware");

const userRouter = express.Router();

userRouter.post("/register", validateUserFields, createUser);
userRouter.post("/login", loginUser)

// supe admin


userRouter.get("/get", getAllUsers)
userRouter.post("/superAdmin/register", authenticateUser, SuperAdminAccess,validateUserFields,addUser)

module.exports = userRouter