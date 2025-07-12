const surveyRepo = require("../repositories/surveyRepository");
class SurveyService {
  getSurvey = async () => {
    const surveyData = await surveyRepo.getSurveyDetails();
    return surveyData;
  };
  updateSurvey = async ({ surveyId, updates }) => {
    const updatedSurvey = await surveyRepo.updateSurvey(surveyId, updates);
    return updatedSurvey;
  };
}
module.exports = new SurveyService();
