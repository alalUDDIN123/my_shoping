const express = require("express");
const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,

} = require("../controller/products.controllers");
const authenticateUser = require("../middleware/authontication.middleware");
const { adminAccess } = require("../middleware/authorised.middleware");
const validateProduct = require("../middleware/productFieldsAnalyzer.middleware");
const validateUpdateProductFields = require("../middleware/updateProduct.middleware");

const productRouter = express.Router();
productRouter.get("/get", getProducts)
productRouter.get("/get/:id", getSingleProduct)

productRouter.use(authenticateUser,adminAccess)
productRouter.post("/add", validateProduct, createProduct);
productRouter.patch("/update",validateUpdateProductFields,updateProduct)
productRouter.delete("/delete",deleteProduct)


module.exports = productRouter