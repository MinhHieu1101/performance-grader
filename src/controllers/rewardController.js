const BaseController = require("./BaseController");
const rewardService = require("../services/rewardService");

class RewardController extends BaseController {
  // GET /:roleId/rewards
  getAll = BaseController.handle(async (req, res) => {
    const { roleId } = req.params;
    const rewards = await rewardService.listRewards(roleId);
    return this.sendSuccess(res, rewards);
  });

  // GET /:roleId/rewards/:rewardId/criteria
  getCriteria = BaseController.handle(async (req, res) => {
    const { rewardId, roleId } = req.params;
    const criteria = await rewardService.listCriteria(rewardId, roleId);
    return this.sendSuccess(res, criteria);
  });
}

module.exports = new RewardController();
