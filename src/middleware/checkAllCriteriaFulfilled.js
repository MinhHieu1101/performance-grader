const criteriaRepo = require("../repositories/criteriaRepository");
const documentRepo = require("../repositories/documentRepository");

module.exports = async (req, res, next) => {
  const userId = req.userId;
  const rewardId = Number(req.params.rewardId);

  const criteriaList = await criteriaRepo.findByRewardId(rewardId);
  if (!criteriaList.length) {
    const err = new Error("No criteria defined for this reward");
    err.status = 400;
    return next(err);
  }

  const docs = await documentRepo.findByUserAndRewardCriteria(userId, rewardId);

  // check approved documents for each criteria
  const approvedByCriteria = new Set(
    docs.filter((d) => d.status === "Approved").map((d) => d.criterion_id)
  );
  const missing = criteriaList
    .map((c) => c.criterion_id)
    .filter((id) => !approvedByCriteria.has(id));

  if (missing.length) {
    const err = new Error(
      `You must upload & have approved documents for all criteria. Missing: ${missing.join(
        ", "
      )}`
    );
    err.status = 400;
    return next(err);
  }

  next();
};
