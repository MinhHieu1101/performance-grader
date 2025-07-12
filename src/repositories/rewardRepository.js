const { db } = require("../config");

class RewardRepository {
  constructor() {
    this.table = "rewards";
  }

  findAll = async (roleId) => {
    const type = roleId == 1 ? "Cá nhân" : "Tập thể";
    const query = db(this.table)
      .select("reward_id", "name", "description", "created_at")
      .where({ type: type })
      .orderBy("reward_id", "asc");
    return query;
  };

  findById = async (rewardId) =>
    db(this.table)
      .select("reward_id", "name", "description", "created_at")
      .where({ reward_id: rewardId })
      .first();
}

module.exports = new RewardRepository();
