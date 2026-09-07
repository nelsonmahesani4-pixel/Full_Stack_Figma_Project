const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const connectDB = require("./config/db");
const authRouter = require("./routes/Auth");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
connectDB();

module.exports = app;