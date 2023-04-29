
const orderModel = require("../modals/order.modal");

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

    // Populate the order object with its associated data
     //
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

    if (!orders || orders.length === 0) {
      return res.status(404).send({ msg: 'No order data found for this user' });
    }

    const simplifiedOrders = orders.map(order => {
  
      const { _id, paymentMethod, orderStatus, deliveryAddress, products,created } = order;
     
      return {_id,paymentMethod,orderStatus,deliveryAddress,created,products};
    });

    res.status(200).send(simplifiedOrders);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};



// get single order  👍👍👍

const getSingleOrder = async (req, res) => {
  const { orderId, productId, userId } = req.body;

  if (!orderId || !productId) {
    return res.status(400).json({ message: 'orderId and productId is required' });
  }

  try {

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // console.log("orders::-", order)

    if (order.user.toString() !== userId) {
      return res.status(401).json({ message: 'You are not authorized to get this order' });
    }
    const singleOrder = await orderModel.findOne({ "products.productId": productId })
      .populate({
        path: "products.productId",
        model: "product",
      })
      .populate({
        path: "deliveryAddress",
        model: "deliveryAddres",
      })
      .lean();

    if (!singleOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // console.log("single order::-", singleOrder)

    res.status(200).json(singleOrder );
  } catch (err) {

    res.status(500).json({ message: 'Internal server error' });
  }
}


// super admin

const getallOrders = async (req, res) => {
  const orders = await orderModel.find();
  try {
    res.status(200).send({ orders });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
};


// remove order  👍👍👍

const removeOrder = async (req, res) => {
  const { orderId, productId, userId } = req.body;

  if (!orderId || !productId) {
    return res.status(400).json({ message: 'orderId and productId is required' });
  }

  try {



    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // console.log("orders::-", order)

    if (order.user.toString() !== userId) {
      return res.status(401).json({ message: 'You are not authorized to remove this order' });
    }

    if (order.orderStatus === "delivered") {
      return res.status(403).json({ message: "Cannot remove a delivered order" });
    }

    await orderModel.findOneAndRemove({ "products.productId": productId });
    res.status(200).json({ message: "Order removed successfully" });
  } catch (err) {

    res.status(500).json({ message: "Internal server error" });
  }
}

// update order status 👍👍👍

const updateOrderStatus = async (req, res) => {
  const { orderId, newOrderStatus } = req.body;


  if (!orderId || !newOrderStatus) {
    return res.status(400).json({ message: 'orderId and newOrderStatus is required' });
  }

  try {
    const existingOrder = await orderModel.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (existingOrder.orderStatus === "delivered") {
      return res.status(403).json({ message: "Cannot update a delivered order" });
    }

    if (existingOrder.orderStatus === newOrderStatus) {
      return res.status(400).json({ message: 'Order status already set to the new status' });
    }

    if (!["pending", "packed", "dispatch", "cancelled", "delivered"].includes(newOrderStatus)) {
      return res.status(400).send({ message: "Valid orderStatus required" });
    }

    existingOrder.orderStatus = newOrderStatus;
    await existingOrder.save();
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (err) {

    res.status(500).json({ message: 'Internal server error' });
  }
};

const countDeliveredOrders = async (req, res) => {
  try {

    const deliveredOrders = await orderModel
      .find({ orderStatus: "delivered" })
      .populate({
        path: "products.productId",
        model: "product",
      })
      .lean();

    const totalAmount = deliveredOrders.reduce((acc, cur) => {
      return (
        acc +
        cur.products.reduce((acc2, cur2) => {
          return acc2 + cur2.productId.discountPrice;
        }, 0)
      );
    }, 0);
    // console.log(deliveredOrders)
    res.status(200).json({ totalOrdersDelivered: deliveredOrders.length, totalAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  PostOrder,
  GetOrders,
  getSingleOrder,
  getallOrders,
  removeOrder,
  updateOrderStatus,
  countDeliveredOrders
}
