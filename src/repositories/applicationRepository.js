const { db } = require("../config");

class ApplicationRepository {
  constructor() {
    this.table = "applications";
  }

  create = async (data, { trx } = {}) =>
    (trx || db)(this.table)
      .insert(data)
      .returning("*")
      .then((rows) => rows[0]);

  findByUser = async (userId) =>
    db(this.table).where({ user_id: userId }).select("*");
}
module.exports = new ApplicationRepository();
