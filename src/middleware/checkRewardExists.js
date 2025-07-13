const rewardRepo = require("../repositories/rewardRepository");

module.exports = async (req, res, next) => {
  const { rewardId } = req.params;
  if (Number.isNaN(rewardId) || rewardId < 1 || rewardId > 34) {
    const err = new Error("Invalid rewardId");
    err.status = 400;
    return next(err);
  }
  const reward = await rewardRepo.findById(rewardId);
  if (!reward) {
    const err = new Error(`Reward ${rewardId} not found`);
    err.status = 404;
    return next(err);
  }
  req.reward = reward;
  next();
};
