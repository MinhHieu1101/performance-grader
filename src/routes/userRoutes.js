const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const userExistenceMiddleware = require("../middleware/userExistenceMiddleware");
const UserController = require("../controllers/userController");

router.get(
  "/:userId",
  authMiddleware,
  userExistenceMiddleware,
  UserController.getById
);

module.exports = router;
