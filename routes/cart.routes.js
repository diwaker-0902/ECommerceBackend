const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Protected routes
router.get("/", authMiddleware.authenticate, cartController.getCart);
router.post("/", authMiddleware.authenticate, cartController.addToCart);
router.put("/:id", authMiddleware.authenticate, cartController.updateCartItem);
router.delete(
  "/:id",
  authMiddleware.authenticate,
  cartController.removeFromCart
);

module.exports = router;
