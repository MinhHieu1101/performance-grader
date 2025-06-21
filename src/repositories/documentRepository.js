const { db } = require("../config");

class DocumentRepository {
  constructor() {
    this.table = "documents";
  }

  create = async ({
    user_id,
    application_id,
    criterion_id,
    file_name,
    file_path,
    status,
  }) =>
    db(this.table)
      .insert({
        user_id,
        application_id,
        criterion_id,
        file_name,
        file_path,
        status,
      })
      .returning("*")
      .then((rows) => rows[0]);

  findById = async (documentId) =>
    db(this.table).where({ document_id: documentId }).first();

  findByUserAndRewardCriteria = async (userId, rewardId) =>
    db(this.table)
      .join(
        "applications",
        "documents.application_id",
        "applications.application_id"
      )
      .join("criteria", "documents.criterion_id", "criteria.criterion_id")
      .where("applications.user_id", userId)
      .andWhere("criteria.reward_id", rewardId)
      .select("documents.*");

  findByApplication = async (applicationId) =>
    db(this.table)
      .where({ application_id: applicationId })
      .select("*")
      .orderBy("uploaded_at", "asc");

  updateStatus = async (documentId, updates) =>
    db(this.table)
      .where({ document_id: documentId })
      .update(updates)
      .returning("*")
      .then((rows) => rows[0]);
}

module.exports = new DocumentRepository();
