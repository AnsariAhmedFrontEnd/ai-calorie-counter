import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ViewSteps = () => {
  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('https://ai-calorie-counter.onrender.com/api/steps/all', {
          headers: { Authorization: token }
        });
        setStepsData(res.data);
      } catch (err) {
        console.error('Error fetching steps data', err);
      }
    };

    fetchSteps();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: stepsData.map(entry => entry.date), // X-axis labels (dates)
    datasets: [
      {
        label: 'Steps',
        data: stepsData.map(entry => entry.steps), // Y-axis data (steps)
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Your Steps Data</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ViewSteps;
