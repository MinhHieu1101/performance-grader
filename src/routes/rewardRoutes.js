const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/rewardController");

// Public endpoints (or add authMiddleware if needed)
router.get("/", RewardController.getAll);
router.get("/:rewardId/criteria", RewardController.getCriteria);

module.exports = router;
