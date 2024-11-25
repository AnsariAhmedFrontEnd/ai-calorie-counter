const mongoose = require("mongoose");

const CalorieEntrySchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g., "2024-11-21"
  calories: { type: Number, required: true }, // Total calories for the date
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  calorieData: { type: [CalorieEntrySchema], default: [] }, // Array of calorie entries
});

module.exports = mongoose.model("User", UserSchema);
