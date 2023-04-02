const express = require("express");
const validateOrderFields = require("../middleware/ValidateOrderFields.middleware");
const authenticateUser = require("../middleware/authontication.middleware");
const {
    PostOrder,

} = require("../controller/orders.controller");

const orderRouter = express.Router();

orderRouter.use(authenticateUser)
orderRouter.post("/post", validateOrderFields, PostOrder)

module.exports=orderRouter