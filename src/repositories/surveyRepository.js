const { db } = require("../config");

class SurveyRepository {
  constructor() {
    this.surveyTable = "survey_responses";
    this.surveyDetailsTable = "survey_details";
  }

  getSurveyDetails = async () =>
    db(this.surveyDetailsTable).select("*");

}
module.exports = new SurveyRepository();