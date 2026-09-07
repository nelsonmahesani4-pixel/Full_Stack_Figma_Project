require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function seedAdmin() {
  try {
    await connectDB();

    const password = await bcrypt.hash("Admin@123", 10);

    await Admin.deleteMany({});

    await Admin.create({
      name: "Admin",
      email: "admin@shopco.com",
      password,
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();