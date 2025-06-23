const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkUserExists = require("../middleware/checkUserExists");
const UploadController = require("../controllers/uploadFileController");

router.post("/", 
      authMiddleware,
      checkUserExists,
      UploadController.uploadFile);

module.exports = router;