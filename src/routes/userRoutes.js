const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const userExistenceMiddleware = require("../middleware/userExistenceMiddleware");
const UserController = require("../controllers/userController");

router.get(
  "/me",
  authMiddleware,
  userExistenceMiddleware,
  UserController.getMe
);

router.get(
  "/:id",
  authMiddleware,
  userExistenceMiddleware,
  UserController.getById
);

router.post("/register", UserController.register);

module.exports = router;
