const rewardRepo = require("../repositories/rewardRepository");
const criteriaRepo = require("../repositories/criteriaRepository");

class RewardService {
  listRewards = async () => {
    return rewardRepo.findAll();
  };

  listCriteria = async (rewardId) => {
    const reward = await rewardRepo.findById(rewardId);
    if (!reward) {
      const err = new Error(`Reward with ID ${rewardId} not found`);
      err.status = 404;
      throw err;
    }
    return criteriaRepo.findByRewardId(rewardId);
  };
}

module.exports = new RewardService();
