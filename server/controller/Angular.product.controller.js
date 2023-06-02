const angularproductModel = require("../modals/Angular.product.model");

// Create a new product
const addProduct = async (req, res) => {
  try {
    const newData = new angularproductModel(req.body);

    await newData.save();

    res.status(201).send({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", errorMessage: error.message });
  }
};

// Get all products
const getProduct = async (req, res) => {
  try {
    const products = await angularproductModel.find();

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server error", errorMessage: error.message });
  }
};

// Get a single product
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await angularproductModel.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: "Server error", errorMessage: error.message });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request parameters
    const regexQuery = new RegExp(query, 'i'); // Create a case-insensitive regular expression query

    const products = await angularproductModel.find({
      $or: [
        { name: { $regex: regexQuery, $options: 'i' } },
        { category: { $regex: regexQuery, $options: 'i' } },
        { description: { $regex: regexQuery, $options: 'i' } }
      ]
    });

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server error", errorMessage: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    // console.log("from front end update product",req.body);
    const { productId ,updatedData} = req.body;
    // console.log("updatedData",updatedData);


    const updatedProduct = await angularproductModel.findByIdAndUpdate(productId,updatedData, {
      new: true
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", errorMessage: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const deletedProduct = await angularproductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", errorMessage: error.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  searchProducts
};
