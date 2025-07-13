const surveyRepo = require("../repositories/surveyRepository");
class SurveyService {
  getSurvey = async () => {
    const surveyData = await surveyRepo.getSurveyDetails();
    return surveyData;
  };
  submitSurvey = async (userId, surveyData) => {
    
    const updatedSurvey = await surveyRepo.submitSurvey(userId, surveyData);
    return updatedSurvey;
  };
}
module.exports = new SurveyService();
