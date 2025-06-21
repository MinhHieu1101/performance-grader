const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const DocumentController = require("../controllers/documentController");

router.patch(
  "/:applicationId/documents/:documentId/status",
  authMiddleware,
  isAdminMiddleware,
  DocumentController.updateStatus
);

module.exports = router;