const express = require("express");
const {
    createUser,
    loginUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser,
    getSingleUser,


} = require("../controller/users.controller");
const authenticateUser = require("../middleware/authontication.middleware");
const { SuperAdminAccess } = require("../middleware/authorised.middleware");
// const { SuperAdminAccess, adminAccess } = require("../middleware/authorised.middleware");
const validateUserFields = require("../middleware/userRegisterFieldsAnalyzer.middleware");

const userRouter = express.Router();

userRouter.post("/register", validateUserFields, createUser);
userRouter.post("/login", loginUser)

// SuperAdmin
userRouter.use(authenticateUser, SuperAdminAccess,)
userRouter.get("/get", getAllUsers)
userRouter.get("/SuperAdmin/get/single",getSingleUser)
userRouter.post("/superAdmin/register",validateUserFields,addUser)
userRouter.patch("/SuperAdmin/update", updateUser)
userRouter.delete("/SuperAdmin/remove",removeUser)


module.exports = userRouter