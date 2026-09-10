require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

const users = [
  {
    name: "Ali Khan",
    email: "ali@example.com",
    password: "123456",
    role: "User",
  },
  {
    name: "Ahmed Raza",
    email: "ahmed@example.com",
    password: "123456",
    role: "User",
  },
  {
    name: "Sara Malik",
    email: "sara@example.com",
    password: "123456",
    role: "User",
  },
  {
    name: "Hassan Ahmed",
    email: "hassan.ahmed@example.com",
    role: "User",
    },
    {
      name: "Ayesha Noor",
      email: "ayesha.noor@example.com",
      role: "User",
      },
    {
      name : "Usman Tariq",
      email: "usman.tariq@example.com",
      role: "User",
    },
{
  name: "Fatima Zahra",
  email: "fatima.zahra@example.com",
  role: "User",
},
{
  name: "Bilal Shah",
  email: "bilal.shah@example.com",
  role: "User",
},
{
  name: "Zain Abbas",
  email: "zain.abbas@example.com",
  role: "User",
},
{
  name: "Iqbal Khan",
  email: "iqbal.khan@example.com",
  role: "User",
}
    ];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});

    await User.insertMany(users);

    console.log("Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();