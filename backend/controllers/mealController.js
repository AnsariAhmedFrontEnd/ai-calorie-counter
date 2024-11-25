const run = require("../geminiAPI");

const caloriCounter = async (req, res) => {
  try {
    const { mealInput } = req.body;
    if (!mealInput) {
      return res.status(400).json({ message: "Meal input is required" });
    }

    const calorieEstimation = await run(mealInput);
    res.status(200).json({ message: "Calorie estimation successful", data: calorieEstimation });
  } catch (error) {
    console.error("Error estimating calories:", error.message);
    res.status(500).json({ message: "Error estimating calories. Try again later." });
  }
};

module.exports = { caloriCounter };
