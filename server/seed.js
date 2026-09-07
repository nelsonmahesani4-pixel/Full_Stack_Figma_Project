require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const { products } = require("./data/products");

async function seedProducts() {
  try {
    await connectDB();

    // Purane products delete karke fresh data import karega
    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(`${products.length} products imported successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error importing products:", error.message);
    process.exit(1);
  }
}

seedProducts();