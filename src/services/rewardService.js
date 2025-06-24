const rewardRepo = require("../repositories/rewardRepository");
const criteriaRepo = require("../repositories/criteriaRepository");

class RewardService {
  listRewards = async (roleId) => {
    return rewardRepo.findAll(roleId);
  };

  listCriteria = async (rewardId, roleId) => {
    const reward = await rewardRepo.findById(rewardId, roleId);
    if (!reward) {
      const err = new Error(
        `Reward with ID ${rewardId} for role ${roleId} not found`
      );
      err.status = 404;
      throw err;
    }
    return criteriaRepo.findByRewardId(rewardId);
  };
}

module.exports = new RewardService();
