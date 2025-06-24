const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/rewardController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRewardExists = require("../middleware/checkRewardExists");
const checkUserExists = require("../middleware/checkUserExists");

router.use(authMiddleware, checkUserExists);
router.get("/", RewardController.getAll);
router.use(checkRewardExists);
router.get("/:rewardId/criteria", RewardController.getCriteria);

module.exports = router;
