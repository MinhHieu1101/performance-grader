const BaseController = require("./BaseController");
const applicationService = require("../services/applicationService");

class ApplicationController extends BaseController {
  // POST /rewards/:rewardId/submit
  submitReward = BaseController.handle(async (req, res) => {
    const userId = req.userId;
    const { rewardId } = req.params;
    const { remarks, documents } = req.body;
    // documents: [{ criteriaId, fileName }, …]

    const app = await applicationService.submitRewardApp({
      userId,
      rewardId: Number(rewardId),
      remarks,
    });

    await applicationService.submitDocuments({
      userId,
      applicationId: app.application_id,
      docs: documents,
    });

    return this.sendSuccess(res, app, 201);
  });

  // POST /performance/:rewardId/submit
  submitPerformance = BaseController.handle(async (req, res) => {
    const userId = req.userId;
    const { formId } = req.params;
    const { remarks, fileName } = req.body;

    const app = await applicationService.submitPerformanceApp({
      userId,
      formId: Number(formId),
      remarks,
    });

    await applicationService.submitDocuments({
      userId,
      applicationId: app.application_id,
      fileName,
    });

    return this.sendSuccess(res, app, 201);
  });
}

module.exports = new ApplicationController();
