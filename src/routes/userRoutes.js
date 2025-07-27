const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkUserExists = require("../middleware/checkUserExists");
const UserController = require("../controllers/userController");
const surveyController = require("../controllers/surveyController");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

router.get("/me", authMiddleware, checkUserExists, UserController.getMe);

router.patch(
  "/:id/role",
  authMiddleware,
  isAdminMiddleware,
  UserController.updateRole
);

router.get("/:id", authMiddleware, checkUserExists, UserController.getById);

router.post("/register", UserController.register);

module.exports = router;
