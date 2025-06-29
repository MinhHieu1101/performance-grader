const { db } = require("../config");

class RewardRepository {
  constructor() {
    this.table = "rewards";
  }

  findAll = async (roleId) =>
    db(this.table)
      .select("reward_id", "name", "description", "created_at")
      .where({ role_id: roleId })
      .orderBy("created_at", "desc");

  findById = async (rewardId) =>
    db(this.table)
      .select("reward_id", "name", "description", "created_at")
      .where({ reward_id: rewardId })
      .first();
}

module.exports = new RewardRepository();
