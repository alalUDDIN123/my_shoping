
// if decrementProductQuantity gives error message then product(s)
// should not added to database but it is adding

// here is post order
// post order 👍👍👍
const PostOrder = async (req, res) => {
    const { products, paymentMethod, orderStatus, deliveryAddressId, userId } = req.body;
    try {
  
      // Check if the user has an existing order with the same products
      const existingOrder = await orderModel.findOne({
        user: userId,
        'products.productId': {
          $in: products.map(p => p.productId)
        }
      });
  
      // console.log("existingOrder:-", existingOrder);
  
      if (existingOrder) {
        return res.status(400).send({ message: "Order already exists", hint: "orderExist" });
      }
  
      // Create the order object
      const order = new orderModel({
        user: userId,
        products: products.map((product) => ({
          productId: product.productId,
        })),
        paymentMethod,
        orderStatus,
        deliveryAddress: deliveryAddressId,
      });
  
      // Save the order in the database
      await order.save();
  
      // Decrement the product stock for each product in the order
      for (const product of products) {
        await decrementProductQuantity(product.productId, 1);
      }
  
      // Populate the order object with its associated data
      const populatedOrder = await orderModel.findOne({ _id: order._id })
        .populate({
          path: "products.productId",
          model: "product",
        })
        .populate({
          path: "deliveryAddress",
          model: "deliveryAddres",
        })
        .lean();
  
      res.status(201).send({ message: "Order placed successfully", hint: "orSucc", order: populatedOrder });
    } catch (error) {
      res.status(500).send({ message: "Internal server error",err:error.message });
    }
  };

  // here is decrementProductQuantity
  const productModal = require("../modals/product.modal");
const decrementProductQuantity = async (productId, quantityToDecrement) => {
    // console.log("productid:-", productId, "quantity:-", quantityToDecrement)
    const product = await productModal.findById(productId);
    if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
    }
    if (product.Stock < quantityToDecrement) {
        throw new Error(`Not enough quantity available for product ${productId}`);
    }
    const StockRemained = product.Stock - quantityToDecrement;
    // console.log("StockRemained::-", StockRemained)
    await productModal.findByIdAndUpdate(productId, { $set: { Stock: StockRemained } });

}