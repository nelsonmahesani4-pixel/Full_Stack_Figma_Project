
const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const authRouter = require("./routes/Auth");

const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.use("/api/products", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}, productsRouter);

app.use("/api/cart", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}, cartRouter);

app.use("/api/auth", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}, authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

module.exports = app;
 
