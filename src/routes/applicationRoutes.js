const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkRewardExists = require("../middleware/checkRewardExists");
const checkAllCriteriaFulfilled = require("../middleware/checkAllCriteriaFulfilled");
const authorizeRoles = require("../middleware/authorizeRoles");
const ApplicationController = require("../controllers/applicationController");
const userExistenceMiddleware = require("../middleware/userExistenceMiddleware");

router.post(
  "/rewards/:rewardId/submit",
  authMiddleware,
  userExistenceMiddleware,
  authorizeRoles("employee", "manager"),
  checkRewardExists,
  checkAllCriteriaFulfilled,
  ApplicationController.submitReward
);

router.post(
  "/performance/:rewardId/submit",
  authMiddleware,
  userExistenceMiddleware,
  authorizeRoles("staff"),
  checkRewardExists,
  checkAllCriteriaFulfilled,
  ApplicationController.submitPerformance
);

module.exports = router;
