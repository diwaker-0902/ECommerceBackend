const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Protected routes
router.get("/", authMiddleware.authenticate, orderController.getUserOrders);
router.post("/", authMiddleware.authenticate, orderController.createOrder);
router.get("/:id", authMiddleware.authenticate, orderController.getOrderById);

module.exports = router;
