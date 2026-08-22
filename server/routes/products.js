const express = require("express");
const router = express.Router();
const store = require("../data/products");

// GET /api/products?category=&dressStyle=&search=&minPrice=&maxPrice=&sort=&page=&limit=
router.get("/", (req, res) => {
  const result = store.listProducts(req.query);
  res.json(result);
});

// GET /api/products/meta/categories
router.get("/meta/categories", (req, res) => {
  res.json({ categories: store.getCategories(), dressStyles: store.getDressStyles() });
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = store.getProduct(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// GET /api/products/:id/related
router.get("/:id/related", (req, res) => {
  res.json(store.getRelated(req.params.id));
});

// POST /api/products  (admin/demo use — adds a product to the catalog)
router.post("/", (req, res) => {
  const { name, category, dressStyle, price } = req.body || {};
  if (!name || !category || !dressStyle || !price) {
    return res.status(400).json({ error: "name, category, dressStyle and price are required" });
  }
  const product = store.createProduct(req.body);
  res.status(201).json(product);
});

module.exports = router;
