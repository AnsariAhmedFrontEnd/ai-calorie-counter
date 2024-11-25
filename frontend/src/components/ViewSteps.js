import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewSteps = () => {
  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    // Fetch steps data on component mount
    const fetchSteps = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('https://ai-calorie-counter.onrender.com/api/steps/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStepsData(res.data);
      } catch (err) {
        console.error('Error fetching steps data', err);
      }
    };

    fetchSteps();
  }, []);

  return (
    <div>
      <h2>Your Steps Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
          </tr>
        </thead>
        <tbody>
          {stepsData.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.date}</td>
              <td>{entry.steps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSteps;
