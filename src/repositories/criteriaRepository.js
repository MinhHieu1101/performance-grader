const { db } = require("../config");

class CriteriaRepository {
  constructor() {
    this.table = "criteria";
  }

  findByRewardId = async (rewardId) =>
    db(this.table)
      .select(
        "criterion_id",
        "name",
        "description",
        "priority_level",
        "created_at"
      )
      .where({ reward_id: rewardId })
      .orderBy("created_at", "asc");
}

module.exports = new CriteriaRepository();
