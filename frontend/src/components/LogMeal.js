import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../authContext";
import AddCalories from "./AddCalories";
import CalorieChart from "./CalorieChart";

const LogMeal = () => {
  const { user } = useUser();
  const [calorieData, setCalorieData] = useState([]);

  useEffect(() => {
    const fetchCalorieData = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          "https://ai-calorie-counter.onrender.com/api/meal/get-calories",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCalorieData(response.data.data);
      } catch (err) {
        console.error("Failed to fetch calorie data.", err);
      }
    };

    fetchCalorieData(); // Call the function inside useEffect
  }, [user]); // Only re-run if user changes

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
        <AddCalories onCalorieAdd={handleCalorieAdd} />
      </div>
      <div className="col-6">
        <CalorieChart calorieData={calorieData} />
      </div>
    </div>
  );
};

export default LogMeal;
