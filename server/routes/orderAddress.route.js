const express = require("express");
const createDeliveryAddress = require("../controller/deliveryAddress.controller");
const deliveryAddressValidation = require("../middleware/ValidateOrderAddress.middleware");

const orderAddressRouter = express.Router();

orderAddressRouter.post("/address", deliveryAddressValidation, createDeliveryAddress)

module.exports = orderAddressRouter