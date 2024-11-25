const express = require("express");
const { caloriCounter } = require("../controllers/mealController");
const router = express.Router();

router.post("/calories", caloriCounter);

module.exports = router;
