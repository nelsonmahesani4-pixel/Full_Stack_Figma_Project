const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`SHOP.CO API listening on http://localhost:${PORT}`);
});
