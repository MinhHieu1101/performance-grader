const express = require("express");
const router = express.Router();
const SurveyController = require("../controllers/surveyController");

router.get("/details", SurveyController.getSurvey);
router.post("/update", SurveyController.updateSurvey);

module.exports = router;
