import React, { useState } from 'react';
import axios from 'axios';

const AddSteps = () => {
  const [steps, setSteps] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const res = await axios.post(
        'https://ai-calorie-counter.onrender.com/api/steps/add',
        { steps, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error adding steps');
    }
  };

  return (
    <div>
      <h2>Log Your Steps</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Steps:
          <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Steps</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSteps;
