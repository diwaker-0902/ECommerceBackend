const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected routes (e.g., for admins)
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.authorize("ADMIN"),
  productController.createProduct
);
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorize("ADMIN"),
  productController.updateProduct
);
router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorize("ADMIN"),
  productController.deleteProduct
);

module.exports = router;
