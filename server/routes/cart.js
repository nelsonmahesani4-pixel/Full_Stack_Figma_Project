const express = require("express");
const Cart = require("../models/Cart.js");
const Product = require("../models/product.js");

const router = express.Router();

function requireCartId(req, res, next) {
  const cartId = req.header("x-cart-id") || req.query.cartId;

  if (!cartId) {
    return res.status(400).json({
      error: "Missing x-cart-id header",
    });
  }

  req.cartId = cartId;
  next();
}

async function serialize(cart) {
  const items = [];

  for (const line of cart.items) {
    const product = await Product.findOne({
      id: Number(line.productId),
    }).lean();

    if (!product) continue;

    const finalPrice =
      product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    items.push({
      productId: line.productId,
      size: line.size,
      color: line.color,
      quantity: line.quantity,
      product,
      lineTotal: finalPrice * line.quantity,
    });
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.lineTotal,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return {
    items,
    subtotal,
    itemCount,
  };
}

// GET CART
router.get("/", requireCartId, async (req, res) => {
  try {
    let cart = await Cart.findOne({
      cartId: req.cartId,
    });

    if (!cart) {
      cart = await Cart.create({
        cartId: req.cartId,
        items: [],
      });
    }

    res.json(await serialize(cart));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get cart",
    });
  }
});

// ADD TO CART
router.post("/", requireCartId, async (req, res) => {
  try {
    const {
      productId,
      size,
      color,
      quantity = 1,
    } = req.body || {};

    const product = await Product.findOne({
      id: Number(productId),
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      cartId: req.cartId,
    });

    if (!cart) {
      cart = new Cart({
        cartId: req.cartId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId === Number(productId) &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        productId: Number(productId),
        size,
        color,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    res.status(201).json(await serialize(cart));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add item to cart",
    });
  }
});

// UPDATE CART ITEM
router.patch("/:productId", requireCartId, async (req, res) => {
  try {
    const {
      size,
      color,
      quantity,
    } = req.body || {};

    const cart = await Cart.findOne({
      cartId: req.cartId,
    });

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId === Number(req.params.productId) &&
        item.size === size &&
        item.color === color
    );

    if (!item) {
      return res.status(404).json({
        error: "Cart item not found",
      });
    }

    item.quantity = Math.max(1, Number(quantity));

    await cart.save();

    res.json(await serialize(cart));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update cart",
    });
  }
});

// DELETE CART ITEM
router.delete("/:productId", requireCartId, async (req, res) => {
  try {
    const {
      size,
      color,
    } = req.body || {};

    const cart = await Cart.findOne({
      cartId: req.cartId,
    });

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId === Number(req.params.productId) &&
          item.size === size &&
          item.color === color
        )
    );

    await cart.save();

    res.json(await serialize(cart));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to remove item from cart",
    });
  }
});

module.exports = router;