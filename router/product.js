const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  res.status(200).json("Bodimaji API");
});

router.get("/product/", async (req, res) => {
  const product = await Product.find({});
  res.json(product);
});

router.get("/product/latest", async (req, res) => {
  const product = await Product.find().sort({ createdAt: -1 }).limit(3);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

router.post("/product", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/product/:id", async (req, res) => {
  try {
    const updatedproduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedproduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.delete();
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
