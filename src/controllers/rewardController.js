const BaseController = require("./BaseController");
const rewardService = require("../services/rewardService");

class RewardController extends BaseController {
  // GET /rewards/roles/:roleId
  getAll = BaseController.handle(async (req, res) => {
    const { roleId } = req.params;
    const rewards = await rewardService.listRewards(roleId);
    return this.sendSuccess(res, rewards);
  });

  // GET /rewards/criteria/:rewardId
  getCriteria = BaseController.handle(async (req, res) => {
    const { rewardId } = req.params;
    const criteria = await rewardService.listCriteria(rewardId);
    return this.sendSuccess(res, criteria);
  });
}

module.exports = new RewardController();
