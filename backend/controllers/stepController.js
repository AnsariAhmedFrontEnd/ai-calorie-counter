const Step = require('../models/Step');

// Add Steps
const addSteps = async (req, res) => {
  const { steps, date } = req.body;
  const userId = req.user.id; // user ID from JWT payload

  try {
    // Check if entry for the date already exists
    let stepEntry = await Step.findOne({ userId, date });

    if (stepEntry) {
      // Update existing entry
      stepEntry.steps = steps;
      await stepEntry.save();
    } else {
      // Create a new entry
      stepEntry = new Step({ userId, steps, date });
      await stepEntry.save();
    }

    res.status(200).json({ message: 'Steps logged successfully', stepEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error logging steps' });
  }
};

// Get Steps
const getSteps = async (req, res) => {
  const userId = req.user.id;

  try {
    const steps = await Step.find({ userId }).sort({ date: -1 });
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving steps' });
  }
};

module.exports = {addSteps, getSteps}