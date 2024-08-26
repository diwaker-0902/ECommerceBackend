const Order = require("../models/order.model");

// Create a new order
exports.createOrder = async (req, res) => {
  const orderObj = {
    userId: req.userId,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
    status: req.body.status,
  };

  try {
    const order = await Order.create(orderObj);
    res.status(201).send(order);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while creating the order.",
    });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while retrieving orders.",
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).send({
        message: "Order not found.",
      });
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving order with id " + req.params.orderId,
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).send({
        message: "Order not found.",
      });
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({
      message: "Error updating order with id " + req.params.orderId,
    });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.orderId);
    if (!order) {
      return res.status(404).send({
        message: "Order not found.",
      });
    }
    res.status(200).send({
      message: "Order deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete order with id " + req.params.orderId,
    });
  }
};
