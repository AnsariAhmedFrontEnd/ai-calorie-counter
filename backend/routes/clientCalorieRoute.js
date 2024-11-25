const express = require("express");
const router = express.Router();

const {
  caloriCounter,
  getCalorieData,
} = require("../controllers/calorieContoller");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/add-calories", authenticate, caloriCounter);
router.get("/get-calories", authenticate, getCalorieData);

module.exports = router;
