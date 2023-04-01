const { default: mongoose } = require("mongoose");
const productModal = require("../modals/product.modal")

// creating or adding product (admin) 👍👍👍👍

const createProduct = async (req, res) => {
  let product = new productModal(req.body);
  try {
    await product.save()
    res.status(201).send({ message: "product added success" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}


// get products 👍👍👍👍
const getProducts = async (req, res) => {
  const {
    query,
    category,
    brand,
    minPrice,
    maxPrice,
    ratings,
    _sort,
    _order,
    page = 1,
    limit
  } = req.query;

  let products;

  try {
    const filter = {};

    if (query) {
      filter.title = new RegExp(query, "i");
    }

    if (category) {
      filter.category = category;
    }



    if (brand) {
      filter.brand = brand;
    }


    if (ratings) {
      filter.ratings = ratings;
    }

    if (minPrice && maxPrice) {
      filter.originalPrice = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filter.originalPrice = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filter.originalPrice = { $lte: parseInt(maxPrice) };
    }


    const sort = {};

    if (_sort && _order) {
      sort[_sort] = _order;
    }

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const startIndex = (parsedPage - 1) * parsedLimit;

    // console.log("page::-",parsedPage,"limit::-",parsedLimit, "filter::-",filter,"sort::-",sort,"rating::",ratings)

    products = await productModal.find(filter)
      .sort(sort)
      .skip(startIndex)
      .limit(parsedLimit)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ products, total: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single product 👍👍👍👍


const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  const product = await productModal.findById({ _id: id });

  if (!product) {
    return res.status(404).json({ message: `No product found with id :${id}` });
  }

  try {
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

// update product (admin) 👍👍👍👍

const updateProduct = async (req, res) => {
  const newData = { ...req.body }

  // console.log(Object.keys(req.body)) 
  // output will containe array with all keys that are passing so we know already ["userId"]
  // exits so I written if length 1 then empty error
  if (Object.keys(req.body).length === 1) {
    return res.status(400).json({ message: "Request body is empty or not passed anything except userId so did not updated product." });
  }


  if (!newData.product_id) {
    return res.status(400).send({ message: "Product_id is required" })
  }


  try {
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(newData.product_id)
    // console.log(isObjectIdValid);

    if (!isObjectIdValid) {
      return res.status(400).send({ message: "Invalid product_id" })
    }

    const checkProductExits = await productModal.findById({ _id: newData.product_id })

    if (!checkProductExits) {
      return res.status(400).send({ message: "Product not found" })
    } else {
      await productModal.findByIdAndUpdate({ _id: newData.product_id }, newData)
      res.status(200).send({ message: "Product updated successfully" })
    }

  } catch (error) {
    // console.log(error.name, error.kind);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ message: "Invalid product_id" })
    }
    res.status(500).send({ message: "Server error", error: error.message })
  }
}

// delete product (admin) 👍👍👍👍
const deleteProduct = async (req, res) => {
  let product_Id = req.body.product_id;

  if(!product_Id){
      return res.status(400).send({ message: "Required product_id " });  
  }
  try {
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(product_Id)
    // console.log(isObjectIdValid);

    if (!isObjectIdValid) {
      return res.status(400).send({ message: "Invalid product_id" })
    }

    const checkProductExits = await productModal.findById({ _id: product_Id })

    if (!checkProductExits) {
      return res.status(400).send({ message: "Product not found" })
    } else {
      await productModal.findByIdAndDelete({ _id: product_Id })
      res.status(200).send({ message: "Product deleted success" })
    }

  } catch (error) {

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ message: "Invalid product_id" })
    }
    res.status(500).send({ message: "Server error", error: error.message })
  }
}

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct

}