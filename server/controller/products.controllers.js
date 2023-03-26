const productModal = require("../modals/product.modal")

// creating or adding product 👍👍👍👍

const createProduct = async (req, res) => {
  let product = new productModal(req.body);
  try {
    await product.save()
    res.status(201).send({ message: "product added success" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}


module.exports = {
  createProduct,
 

}