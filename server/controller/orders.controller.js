const deliveryAddressModel = require("../modals/DeliveryOrderAddress.modal");
const orderModel = require("../modals/order.modal");

// post order 👍👍👍
const PostOrder = async (req, res) => {
    const { products, paymentMethod, orderStatus,deliveryAddressId,userId} = req.body;
    try {
  
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
  
      res.status(201).send({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  };
  

module.exports = {
    PostOrder
}
