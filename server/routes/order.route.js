const express = require("express");
const validateOrderFields = require("../middleware/ValidateOrderFields.middleware");
const authenticateUser = require("../middleware/authontication.middleware");
const {
    PostOrder,
    GetOrders,
    getSingleOrder,

} = require("../controller/orders.controller");

const orderRouter = express.Router();

orderRouter.use(authenticateUser)
orderRouter.post("/post", validateOrderFields, PostOrder)
orderRouter.get("/get", GetOrders)
orderRouter.get("/get/singleOrder",getSingleOrder)

module.exports = orderRouter