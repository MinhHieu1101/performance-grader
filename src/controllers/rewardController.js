const BaseController = require("./BaseController");
const rewardService = require("../services/rewardService");

class RewardController extends BaseController {
  // GET /rewards
  getAll = BaseController.handle(async (req, res) => {
    const rewards = await rewardService.listRewards();
    return this.sendSuccess(res, rewards);
  });

  // GET /rewards/:rewardId/criteria
  getCriteria = BaseController.handle(async (req, res) => {
    const { rewardId } = req.params;
    const criteria = await rewardService.listCriteria(Number(rewardId));
    return this.sendSuccess(res, criteria);
  });
}

module.exports = new RewardController();