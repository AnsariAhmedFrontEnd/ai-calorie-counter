import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../authContext";
import AddCalories from "./AddCalories"; // Import the AddCalories component
import CalorieChart from "./CalorieChart"; // Import the CalorieChart component

const LogMeal = () => {
  const { user } = useUser(); // Get user from context
  const [calorieData, setCalorieData] = useState([]); // To hold calorie data from the API

  const fetchCalorieData = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await axios.get(
        "https://ai-calorie-counter.onrender.com/api/meal/get-calories",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCalorieData(response.data.data); // Set fetched calorie data
    } catch (err) {
      console.error("Failed to fetch calorie data.", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCalorieData(); // Fetch calorie data when the user is logged in
    }
  }, [user, fetchCalorieData]);

  const handleCalorieAdd = (calorieEstimate) => {
    setCalorieData((prevData) => [
      ...prevData,
      {
        date: new Date().toISOString().split("T")[0],
        calories: calorieEstimate,
      },
    ]);
  };

  return (
    <div className="row p-5">
      <div className="col-6">
        <AddCalories onCalorieAdd={handleCalorieAdd} />{" "}
        {/* Pass handler to AddCalories */}
      </div>
      <div className="col-6">
        <CalorieChart calorieData={calorieData} />{" "}
        {/* Pass calorieData to the chart */}
      </div>
    </div>
  );
};

export default LogMeal;
