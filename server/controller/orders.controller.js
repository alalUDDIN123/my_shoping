
const orderModel = require("../modals/order.modal");

// post order 👍👍👍
const PostOrder = async (req, res) => {
  const { products, paymentMethod, orderStatus, deliveryAddressId, userId } = req.body;
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

    res.status(201).send({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};


// retrive orders 👍👍👍

const GetOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel
      .find({ user: userId })
      .populate({
        path: "products.productId",
        model: "product",
      })
      .populate({
        path: "deliveryAddress",
        model: "deliveryAddres",
      })
      .lean();

    if (!orders || orders.length === 0 || orders[0].products.length === 0) {
      return res.status(404).send({ msg: 'No order data found for this user' });
    }

    const totalPrice = orders.reduce((total, order) => {
      // console.log("orders total::-",total,"__and order::-",order) 
      const orderTotal = order.products.reduce((subtotal, product) => {
        return subtotal + product.productId.discountPrice;
      }, 0);
      return total + orderTotal;
    }, 0);
   
    res.status(200).send({ orders, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};


// get single order  👍👍👍

const getSingleOrder= async(req,res)=>{
  const { orderId } = req.body;
  
  try {
    const order = await orderModel.findById(orderId)
      .populate({
        path: "products.productId",
        model: "product",
      })
      .populate({
        path: "deliveryAddress",
        model: "deliveryAddres",
      })
      .lean();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const totalPrice = order.products.reduce((acc, cur) => {
      return acc + cur.productId.discountPrice;
    }, 0);
    res.status(200).json({ order, totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
  PostOrder,
  GetOrders,
  getSingleOrder
}
