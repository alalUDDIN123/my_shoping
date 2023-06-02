const express = require("express")
const {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
} = require("../controller/Angular.product.controller")

const AngularProductRouter = express.Router()
AngularProductRouter.post("/add", addProduct)
AngularProductRouter.get("/get", getProduct)
AngularProductRouter.get("/get/:productId", getProductDetails)
AngularProductRouter.get("/get/search", getProductDetails)
AngularProductRouter.patch("/update", updateProduct)
AngularProductRouter.delete("/delete", deleteProduct)

module.exports = AngularProductRouter
