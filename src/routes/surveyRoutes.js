const express = require("express");
const router = express.Router();
const SurveyController = require("../controllers/surveyController");

router.get("/details", SurveyController.getSurvey);
router.post("/submit/:userId", SurveyController.submitSurvey);

module.exports = router;
