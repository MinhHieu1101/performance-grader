const BaseController = require("./BaseController");
const surveyService = require("../services/surveyService");

class SurveyController extends BaseController {

  getSurvey = BaseController.handle(async (req, res) => {
    const surveyData = await surveyService.getSurvey();
    return this.sendSuccess(res, surveyData);
  });

  submitSurvey = BaseController.handle(async (req, res) => {
    const { answers: surveyData } = req.body;
    const { userId } = req.params;

    const updatedSurvey = await surveyService.submitSurvey(userId, surveyData);
    return this.sendSuccess(res, updatedSurvey);
  });
}

module.exports = new SurveyController();
