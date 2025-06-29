const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/rewardController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRewardExists = require("../middleware/checkRewardExists");
const checkUserExists = require("../middleware/checkUserExists");

router.use(authMiddleware, checkUserExists);
router.route("/roles/:roleId").get(RewardController.getAll);
router
  .route("/criteria/:rewardId")
  .all(checkRewardExists)
  .get(RewardController.getCriteria);

module.exports = router;
