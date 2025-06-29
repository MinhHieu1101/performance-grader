// src/services/applicationService.js
const { db } = require("../config");
const applicationRepo = require("../repositories/applicationRepository");
const documentRepo = require("../repositories/documentRepository");

class ApplicationService {
  submitRewardApp = async ({ userId, rewardId, remarks, docs }) => {
    return await db.transaction(async (trx) => {
      const app = await applicationRepo.create(
        { user_id: userId, reward_id: rewardId, type: "reward", remarks },
        { trx }
      );

      await Promise.all(
        docs.map((d) =>
          documentRepo.create(
            {
              user_id: userId,
              application_id: app.application_id,
              criterion_id: d.criterionId,
              file_name: d.fileName,
              file_path: d.fileName,
              status: "Pending",
            },
            { trx }
          )
        )
      );

      return app;
    });
  };

  submitPerformanceApp = async ({ userId, rewardId, remarks, fileName }) => {
    return await db.transaction(async (trx) => {
      const app = await applicationRepo.create(
        { user_id: userId, reward_id: rewardId, type: "performance", remarks },
        { trx }
      );
      await documentRepo.create(
        {
          user_id: userId,
          application_id: app.application_id,
          criterion_id: null,
          file_name: fileName,
          file_path: fileName,
          status: "Pending",
        },
        { trx }
      );
      return app;
    });
  };

  submitDocuments = async ({ userId, applicationId, docs }) => {
    // docs = [ { criteriaId, fileName } ]

    return Promise.all(
      docs.map((d) =>
        documentRepo.create({
          user_id: userId,
          application_id: applicationId,
          criterion_id: d.criterionId,
          file_name: d.fileName,
          file_path: d.fileName,
          status: "Pending",
        })
      )
    );
  };

  getApplicaionByUserAndYear = async (userId, year) => {
    return await applicationRepo.findByUserAndYear(userId, year);
  };

  updateApplication = async (applicationId, data) => {
    return await applicationRepo.update(applicationId, data);
  };
}

module.exports = new ApplicationService();
