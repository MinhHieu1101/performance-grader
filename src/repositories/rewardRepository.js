const { db } = require("../config");

class RewardRepository {
  constructor() {
    this.table = "rewards";
  }

  findAll = async () =>
    db(this.table)
      .select("reward_id", "name", "description", "effective_date")
      .orderBy("effective_date", "desc");

  findById = async (rewardId) =>
    db(this.table)
      .select("reward_id", "name", "description", "effective_date")
      .where({ reward_id: rewardId })
      .first();
}

module.exports = new RewardRepository();
