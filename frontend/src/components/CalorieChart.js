import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CalorieChart = ({ calorieData }) => {
  // Helper function to get the next 7 days
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }
    return days;
  };

  // Map calorie data to the next 7 days
  const next7Days = getNext7Days();
  const chartData = next7Days.map((date) => {
    const entry = calorieData.find((item) => item.date === date);
    return entry ? entry.calories : 0; // Default to 0 if no data for the day
  });

  // Format data for the chart
  const data = {
    labels: next7Days,
    datasets: [
      {
        label: "Projected Calories",
        data: chartData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} kcal`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Calories",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center">Calorie Chart (Next 7 Days)</h2>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CalorieChart;
