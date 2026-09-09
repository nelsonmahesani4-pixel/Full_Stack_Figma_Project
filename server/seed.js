require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");
const { products } = require("./data/products");

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);

    await mongoose.disconnect();
    process.exit(1);
  }
}

seedProducts();