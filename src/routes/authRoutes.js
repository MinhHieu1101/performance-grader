const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { userDetails, addUser } = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/user", userDetails);

router.post("/addUser", addUser);

module.exports = router;
