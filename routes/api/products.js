const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

// New instance class
const productService = new ProductsService();

// Routes
router.get("/", listProducts);
router.get("/:productId", getProduct);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.patch("/:productId", partialUpdateProduct);
router.delete("/:productId", deleteProduct);

// Functions
async function listProducts(req, res, next) {
  const { tags } = req.query;
  console.log("req", req.query);
  try {
    const products = await productService.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: "products listed",
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct({ productId });
    res.status(200).json({
      data: product,
      message: "products retrieved",
    });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  const { body: product } = req;
  try {
    const createProduct = await productService.createProduct({ product });
    res.status(201).json({
      data: createProduct,
      message: "product created",
    });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const updateProduct = await productService.updateProduct({
      productId,
      product,
    });
    res.status(200).json({
      data: updateProduct,
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
}

async function partialUpdateProduct(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const partialUpdateProduct = await productService.partialUpdateProduct({
      productId,
      product,
    });
    res.status(200).json({
      data: partialUpdateProduct,
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  const { productId } = req.params;
  try {
    const deleteProduct = await productService.deleteProduct({ productId });
    res.status(200).json({
      data: deleteProduct,
      message: "product deleted",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = router;
