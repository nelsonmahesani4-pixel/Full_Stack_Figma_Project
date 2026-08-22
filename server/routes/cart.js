const express = require("express");
const router = express.Router();
const { getProduct, finalPrice } = require("../data/products");

// Simple in-memory cart store keyed by a cartId the client generates
// and persists in localStorage. A real deployment would swap this for
// a database table keyed by user/session id.
const carts = new Map();

function getCart(cartId) {
  if (!carts.has(cartId)) carts.set(cartId, []);
  return carts.get(cartId);
}

function serialize(cartId) {
  const items = getCart(cartId).map((line) => {
    const product = getProduct(line.productId);
    return {
      productId: line.productId,
      size: line.size,
      color: line.color,
      quantity: line.quantity,
      product,
      lineTotal: product ? finalPrice(product) * line.quantity : 0,
    };
  });
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  return { items, subtotal, itemCount: items.reduce((n, i) => n + i.quantity, 0) };
}

function requireCartId(req, res, next) {
  const cartId = req.header("x-cart-id") || req.query.cartId;
  if (!cartId) return res.status(400).json({ error: "Missing x-cart-id header" });
  req.cartId = cartId;
  next();
}

// GET /api/cart
router.get("/", requireCartId, (req, res) => {
  res.json(serialize(req.cartId));
});

// POST /api/cart  { productId, size, color, quantity }
router.post("/", requireCartId, (req, res) => {
  const { productId, size, color, quantity = 1 } = req.body || {};
  const product = getProduct(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cart = getCart(req.cartId);
  const existing = cart.find((l) => l.productId === Number(productId) && l.size === size && l.color === color);
  if (existing) existing.quantity += Number(quantity);
  else cart.push({ productId: Number(productId), size, color, quantity: Number(quantity) });

  res.status(201).json(serialize(req.cartId));
});

// PATCH /api/cart/:productId  { size, color, quantity }
router.patch("/:productId", requireCartId, (req, res) => {
  const { size, color, quantity } = req.body || {};
  const cart = getCart(req.cartId);
  const line = cart.find((l) => l.productId === Number(req.params.productId) && l.size === size && l.color === color);
  if (!line) return res.status(404).json({ error: "Cart line not found" });
  line.quantity = Math.max(1, Number(quantity));
  res.json(serialize(req.cartId));
});

// DELETE /api/cart/:productId  body: { size, color }
router.delete("/:productId", requireCartId, (req, res) => {
  const { size, color } = req.body || {};
  const cart = getCart(req.cartId);
  const filtered = cart.filter((l) => !(l.productId === Number(req.params.productId) && l.size === size && l.color === color));
  carts.set(req.cartId, filtered);
  res.json(serialize(req.cartId));
});

module.exports = router;
