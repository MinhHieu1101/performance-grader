const BaseController = require("./BaseController");
const surveyService = require("../services/surveyService");

class SurveyController extends BaseController {

  getSurvey = BaseController.handle(async (req, res) => {
    const surveyData = await surveyService.getSurvey(req.body);
    return this.sendSuccess(res, surveyData);
  });
  
  updateSurvey = BaseController.handle(async (req, res) => {
    const updatedSurvey = await surveyService.updateSurvey(req.body);
    return this.sendSuccess(res, updatedSurvey);
  });
}

module.exports = new SurveyController();
