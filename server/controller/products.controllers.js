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


// get products 👍👍👍👍
const getProducts = async (req, res) => {
  const {
    title,
    category,
    brand,
    minPrice,
    maxPrice,
    _sort,
    _order,
    page = 1,
    limit
  } = req.query;

  let products;

  try {
    const filter = {};

    if (title) {
      filter.title = new RegExp(title, "i");
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: parseInt(maxPrice) };
    }


    const sort = {};

    if (_sort && _order) {
      sort[_sort] = _order;
    }

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const startIndex = (parsedPage - 1) * parsedLimit;

    // console.log("filter:- ", filter,"sort:-",sort, "minRate", minRating,"maxrating", maxRating)

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


const getSingleProduct= async(req,res)=>{
  const id= req.params.id;
  
  const product= await productModal.findById({_id:id});

  if(!product){
    return res.status(404).json({ message: `No product found with id :${id}` });
  }

  try {
    res.status(200).json({product});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}
module.exports = {
  createProduct,
  getProducts,
  getSingleProduct

}