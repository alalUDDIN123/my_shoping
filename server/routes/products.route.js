const express = require("express");
const {
    createProduct,


} = require("../controller/products.controllers");
const authenticateUser = require("../middleware/authontication.middleware");
const { adminAccess } = require("../middleware/authorised.middleware");
const validateProduct = require("../middleware/productFieldsAnalyzer.middleware");

const productRouter = express.Router();

productRouter.post("/add", authenticateUser, adminAccess, validateProduct, createProduct);


module.exports = productRouter