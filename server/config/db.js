const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
};

// username : vinex521_db_user
// password : test@123
// mongodb+srv://vinex521_db_user:test@123@restaurant-dashboard.nq7zx8j.mongodb.net/?appName=restaurant-dashboard
