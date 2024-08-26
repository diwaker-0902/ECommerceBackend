const Cart = require("../models/cart.model");

// Add product to cart
exports.addToCart = async (req, res) => {
  const cartItem = {
    userId: req.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };

  try {
    const item = await Cart.create(cartItem);
    res.status(201).send(item);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while adding to the cart.",
    });
  }
};

// Get cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.userId }).populate("productId");
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while retrieving cart items.",
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(
      req.params.cartItemId,
      { quantity: req.body.quantity },
      { new: true }
    );
    if (!item) {
      return res.status(404).send({
        message: "Cart item not found.",
      });
    }
    res.status(200).send(item);
  } catch (err) {
    res.status(500).send({
      message: "Error updating cart item with id " + req.params.cartItemId,
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findByIdAndRemove(req.params.cartItemId);
    if (!item) {
      return res.status(404).send({
        message: "Cart item not found.",
      });
    }
    res.status(200).send({
      message: "Cart item removed successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete cart item with id " + req.params.cartItemId,
    });
  }
};
