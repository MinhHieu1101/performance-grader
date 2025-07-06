const criteriaRepo = require("../repositories/criteriaRepository");
const documentRepo = require("../repositories/documentRepository");

module.exports = async (req, res, next) => {
  const userId = req.userId;
  const rewardId = Number(req.params.rewardId);
  const priority_level = req.body.priority_level;

  const uploadingDocs = req.body.documents;
  if (
    !uploadingDocs ||
    !Array.isArray(uploadingDocs) ||
    uploadingDocs.length === 0
  ) {
    const err = new Error("No documents provided");
    err.status = 400;
    return next(err);
  }

  const existingDocs = await documentRepo.findByUserAndRewardCriteria(
    userId,
    rewardId
  );
  // compare existing documents with the ones being uploaded
  const existingDocNames = existingDocs.map((doc) => doc.filename);
  const newDocs = uploadingDocs.filter(
    (doc) => !existingDocNames.includes(doc.filename)
  );
  if (newDocs.length === 0) {
    const err = new Error("No new documents to upload");
    err.status = 400;
    return next(err);
  }

  const criteriaList = await criteriaRepo.findByRewardId(rewardId);
  if (!criteriaList.length) {
    const err = new Error("No criteria defined for this reward");
    err.status = 400;
    return next(err);
  }

  if (priority_level) {
    criteriaList = criteriaList.filter(
      (criterion) => criterion.priority_level === priority_level
    );
  }

  if (uploadingDocs.length !== criteriaList.length) {
    const err = new Error(
      `You must upload documents for all criteria. Uploaded: ${uploadingDocs.length}, Required: ${criteriaList.length}`
    );
    err.status = 400;
    return next(err);
  }

  next();
};
