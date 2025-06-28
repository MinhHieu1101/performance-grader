const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkRewardExists = require("../middleware/checkRewardExists");
const checkAllCriteriaFulfilled = require("../middleware/checkAllCriteriaFulfilled");
const authorizeRoles = require("../middleware/authorizeRoles");
const ApplicationController = require("../controllers/applicationController");
const checkUserExists = require("../middleware/checkUserExists");

router.post(
  "/rewards/:rewardId/submit",
  authMiddleware,
  checkUserExists,
  authorizeRoles("nhanvien", "quanly", "admin"),
  checkRewardExists,
  checkAllCriteriaFulfilled,
  ApplicationController.submitReward
);

router.post(
  "/performance/:rewardId/submit",
  authMiddleware,
  checkUserExists,
  authorizeRoles("nhanvien", "quanly", "admin"),
  checkRewardExists,
  checkAllCriteriaFulfilled,
  ApplicationController.submitPerformance
);

router.get(
  "/applications/:userId/:year",
  authMiddleware,
  authorizeRoles("nhanvien", "quanly", "admin"),
  checkUserExists,
  ApplicationController.getApplicationByUserAndYear
);

router.put(
  "/applications/:applicationId",
  authMiddleware,
  authorizeRoles("nhanvien", "quanly", "admin"),
  ApplicationController.updateApplication
);

module.exports = router;
