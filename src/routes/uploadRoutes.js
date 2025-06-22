const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userExistenceMiddleware = require("../middleware/userExistenceMiddleware");
const UploadController = require("../controllers/uploadFileController");

router.post("/", 
      authMiddleware,
      userExistenceMiddleware,
      UploadController.uploadFile);

module.exports = router;