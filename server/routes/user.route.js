const express = require("express");
const {
    createUser,
    loginUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser,
    getSingleUser,
    ChangePassword,
    forgetPassword,
    resetPassword,


} = require("../controller/users.controller");
const authenticateUser = require("../middleware/authontication.middleware");
const { SuperAdminAccess } = require("../middleware/authorised.middleware");
// const { SuperAdminAccess, adminAccess } = require("../middleware/authorised.middleware");
const validateUserFields = require("../middleware/userRegisterFieldsAnalyzer.middleware");

const userRouter = express.Router();

userRouter.post("/register", validateUserFields, createUser);
userRouter.post("/login", loginUser)
userRouter.post("/change/password", authenticateUser,ChangePassword)
userRouter.post("/forget/password",forgetPassword)
userRouter.get('/reset_password', resetPassword);


// supe admin

userRouter.use(authenticateUser, SuperAdminAccess,)
userRouter.get("/get", getAllUsers)
userRouter.get("/SuperAdmin/get/single",getSingleUser)
userRouter.post("/superAdmin/register",validateUserFields,addUser)
userRouter.patch("/SuperAdmin/update", updateUser)
userRouter.delete("/SuperAdmin/remove",removeUser)


module.exports = userRouter