const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkUserExists = require("../middleware/checkUserExists");
const UserController = require("../controllers/userController");

router.get(
  "/me",
  authMiddleware,
  checkUserExists,
  UserController.getMe
);

router.get(
  "/:id",
  authMiddleware,
  checkUserExists,
  UserController.getById
);

router.post("/register", UserController.register);

module.exports = router;
