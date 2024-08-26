const Product = require("../models/product.model");

// Create a new product
exports.createProduct = async (req, res) => {
  const productObj = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
  };

  try {
    const product = await Product.create(productObj);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while creating the product.",
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while retrieving products.",
    });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({
        message: "Product not found.",
      });
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving product with id " + req.params.productId,
    });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).send({
        message: "Product not found.",
      });
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({
      message: "Error updating product with id " + req.params.productId,
    });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    if (!product) {
      return res.status(404).send({
        message: "Product not found.",
      });
    }
    res.status(200).send({
      message: "Product deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete product with id " + req.params.productId,
    });
  }
};
