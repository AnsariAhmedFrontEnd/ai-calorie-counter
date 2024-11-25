import React, { useState } from "react";
import axios from "axios";

const AddCalories = ({ onCalorieAdd }) => {
  const [mealInput, setMealInput] = useState("");
  const [calorieEstimate, setCalorieEstimate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ai-calorie-counter.onrender.com/api/meal/calories",
        { mealInput }
      );
      const calorieEstimate = response.data.data;
      onCalorieAdd(calorieEstimate); // Call the function passed from LogMeal
      setCalorieEstimate(calorieEstimate);
      setMealInput(""); // Clear the input field
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Failed to estimate calories.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center">Log Your Meal</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="mealInput" className="form-label">
                Meal Description
              </label>
              <input
                type="text"
                id="mealInput"
                className="form-control"
                placeholder="Enter your meal description"
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Estimate Calories
            </button>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
          {calorieEstimate && (
            <p className="mt-3">Estimated Calories: {calorieEstimate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCalories;
