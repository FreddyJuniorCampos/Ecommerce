const express = require("express");
const ProductsService = require("../../services/products");
const validation = require("../../utils/middlewares/validationHandler");
const passport = require("passport");

const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require("../../utils/schemas/products");

// JWT strategy
require("../../utils/auth/strategies/jwt");

function productsApi(app) {
  const router = express.Router();
  app.use("/api/products", router);
  // New instance class
  const productService = new ProductsService();

  // Routes
  router.get("/", listProducts);
  router.get("/:productId", getProduct);
  router.post("/", validation(createProductSchema), createProduct);
  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    validation(productIdSchema, "params"),
    validation(updateProductSchema),
    updateProduct
  );
  router.patch("/:productId", partialUpdateProduct);
  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    deleteProduct
  );

  // Functions
  async function listProducts(req, res, next) {
    const { tags } = req.query;
    try {
      // throw new Error("This is an error from the API");

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
}

module.exports = productsApi;
