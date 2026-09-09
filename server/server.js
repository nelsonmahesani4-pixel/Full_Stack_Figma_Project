require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products.js");
const cartRouter = require("./routes/cart.js");
const authRouter = require("./routes/Auth.js");
const usersRouter = require("./routes/users.js");
const ordersRouter = require("./routes/orders.js");

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.use(
  "/api/products",
  async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  },
  productsRouter
);

app.use(
  "/api/cart",
  async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  },
  cartRouter
);

app.use(
  "/api/auth",
  async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  },
  authRouter
);

app.use(
  "/api/users",
  async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  },
  usersRouter
);

app.use(
  "/api/orders",
  async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  },
  ordersRouter
);

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

module.exports = app;