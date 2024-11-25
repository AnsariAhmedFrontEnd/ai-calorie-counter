const express = require("express");
const router = express.Router();
const User = require("../models/User");

const caloriCounter = async (req, res) => {
  const { date, calories } = req.body;

  try {
    const user = req.user;

    const existingEntry = user.calorieData.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.calories += parseInt(calories, 10);
    } else {
      user.calorieData.push({ date, calories });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Calories logged successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging calories.", error });
  }
};

const getCalorieData = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, data: user.calorieData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching calorie data.", error });
  }
};

module.exports = { caloriCounter, getCalorieData };
