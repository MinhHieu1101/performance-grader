const { db } = require("../config");

class SurveyRepository {
  constructor() {
    this.surveyTable = "survey_responses";
    this.surveyDetailsTable = "survey_details";
  }

  getSurveyDetails = async () => db(this.surveyDetailsTable).select("*");

  submitSurvey = async (userId, surveyData) => {
    const {
      q1_rating,
      q2_rating,
      q3_rating,
      q4_rating,
      q5_rating,
      q6_rating,
      q7_rating,
      q8_rating,
      q9_rating,
      q10_rating,
      q11_rating,
      q12_rating,
      q13_rating,
      q14_rating,
      q15_rating,
      q16_rating,
    } = surveyData;
    
    // Check if surveyData is missing or empty
    if (!surveyData || Object.keys(surveyData).length === 0) {
      throw new Error('Survey data is required');
    }

    // Check if user already has a survey response
    const existingResponse = await db(this.surveyTable)
      .where({ user_id: userId })
      .first();

    if (existingResponse) {
      // Update existing response
      return db(this.surveyTable)
        .where({ user_id: userId })
        .update({
          q1_rating,
          q2_rating,
          q3_rating,
          q4_rating,
          q5_rating,
          q6_rating,
          q7_rating,
          q8_rating,
          q9_rating,
          q10_rating,
          q11_rating,
          q12_rating,
          q13_rating,
          q14_rating,
          q15_rating,
          q16_rating,
        })
        .returning("*");
    } else {
      // Insert new response
      return db(this.surveyTable)
        .insert({
          user_id: userId,
          q1_rating,
          q2_rating,
          q3_rating,
          q4_rating,
          q5_rating,
          q6_rating,
          q7_rating,
          q8_rating,
          q9_rating,
          q10_rating,
          q11_rating,
          q12_rating,
          q13_rating,
          q14_rating,
          q15_rating,
          q16_rating,
        })
        .returning("*");
    }
  };
}
module.exports = new SurveyRepository();
