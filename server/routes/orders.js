const express = require("express");
const Order = require("../models/Order.js");
const User = require("../models/User.js");
const protect = require("../middleware/auth.js");

const router = express.Router();

// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      customer,
      items,
      subtotal,
      deliveryFee = 15,
      paymentMethod = "Cash on Delivery",
    } = req.body;

    // Basic validation
    if (!customer?.name || !customer?.email || !customer?.address) {
      return res.status(400).json({
        error: "Customer name, email and address are required",
      });
    }

    if (!items || !items.length) {
      return res.status(400).json({
        error: "Order must contain at least one item",
      });
    }

    if (Number(subtotal) < 0) {
      return res.status(400).json({
        error: "Invalid subtotal",
      });
    }

    // If userId is provided, check user exists
    let user = null;

    if (userId) {
      user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    const total =
      Number(subtotal) + Number(deliveryFee);

    const order = await Order.create({
      orderNumber,

      user: user ? user._id : null,

      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        address: customer.address,
      },

      items,

      subtotal: Number(subtotal),

      deliveryFee: Number(deliveryFee),

      total,

      paymentMethod,

      status: "pending",

      paymentStatus: "pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create order",
    });
  }
});

// ==========================================
// GET ALL ORDERS
// GET /api/orders
// ADMIN ONLY
// ==========================================
router.get("/", protect, async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));

    const total = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .populate("user", "name email phone address")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
});

// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ADMIN ONLY
// ==========================================
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone address")
      .lean();

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch order",
    });
  }
});

// ==========================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:id/status
// ADMIN ONLY
// ==========================================
router.patch(
  "/:id/status",
  protect,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          error: "Invalid order status",
          allowedStatuses,
        });
      }

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      res.json({
        message: "Order status updated successfully",
        order,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to update order status",
      });
    }
  }
);

// ==========================================
// UPDATE PAYMENT STATUS
// PATCH /api/orders/:id/payment-status
// ADMIN ONLY
// ==========================================
router.patch(
  "/:id/payment-status",
  protect,
  async (req, res) => {
    try {
      const { paymentStatus } = req.body;

      const allowedStatuses = [
        "pending",
        "paid",
        "failed",
      ];

      if (!allowedStatuses.includes(paymentStatus)) {
        return res.status(400).json({
          error: "Invalid payment status",
          allowedStatuses,
        });
      }

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            paymentStatus,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      res.json({
        message: "Payment status updated successfully",
        order,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to update payment status",
      });
    }
  }
);

// ==========================================
// DELETE ORDER
// DELETE /api/orders/:id
// ADMIN ONLY
// ==========================================
router.delete("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete order",
    });
  }
});

module.exports = router;