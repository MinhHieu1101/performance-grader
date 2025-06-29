const BaseController = require("./BaseController");
const applicationService = require("../services/applicationService");

class ApplicationController extends BaseController {
  // POST /rewards/:rewardId/submit
  submitReward = BaseController.handle(async (req, res) => {
    const userId = req.userId;
    const { rewardId } = req.params;
    const { remarks, documents } = req.body;
    // documents: [{ criterionId, fileName }, …]

    const app = await applicationService.submitRewardApp({
      userId,
      rewardId: Number(rewardId),
      remarks,
    });

    // redundant check, as this is done in the service => can be moved elsewhere
    /* await applicationService.submitDocuments({
      userId,
      applicationId: app.application_id,
      docs: documents,
    }); */

    return this.sendSuccess(res, app, 201);
  });

  // POST /performance/:rewardId/submit
  submitPerformance = BaseController.handle(async (req, res) => {
    const userId = req.userId;
    const { rewardId } = req.params;
    const { remarks, file } = req.body;

    const app = await applicationService.submitPerformanceApp({
      userId,
      rewardId: Number(rewardId),
      remarks,
    });

    // redundant check, as this is done in the service => can be moved elsewhere
    /* await applicationService.submitDocuments({
      userId,
      applicationId: app.application_id,
      docs: [
        {
          criterionId: null, // need to review this
          fileName: file,
        },
      ],
    }); */

    return this.sendSuccess(res, app, 201);
  });

  // GET /applications/:userId/:year
  getApplicationByUserAndYear = BaseController.handle(async (req, res) => {
    const userId = req.params.userId;
    const year = req.params.year;

    const applications = await applicationService.getApplicaionByUserAndYear(
      userId,
      year
    );

    return this.sendSuccess(res, applications);
  });

  // PUT /applications/:applicationId
  updateApplication = BaseController.handle(async (req, res) => {
    const applicationId = req.params.applicationId;
    const data = req.body;

    const updatedApplication = await applicationService.updateApplication(
      applicationId,
      data
    );

    return this.sendSuccess(res, updatedApplication);
  });
}

module.exports = new ApplicationController();
