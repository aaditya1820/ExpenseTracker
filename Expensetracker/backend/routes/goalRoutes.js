const express = require("express");
const { getGoal, setGoal } = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/set", protect, setGoal);
router.get("/get", protect, getGoal);

module.exports = router;
