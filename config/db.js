const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/insuranceDB");
    await mongoose.connect(
      "mongodb://admin:Admin%401234@localhost:27017/insuranceDB?authSource=admin"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
