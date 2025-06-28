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

  findByUserAndYear = async (userId, year) =>
    db(this.table).where({ user_id: userId, year }).select("*");

  // should remove and then create another one
  update = async (applicationId, data, { trx } = {}) =>
    (trx || db)(this.table)
      .where({ application_id: applicationId })
      .update(data)
      .returning("*")
      .then((rows) => rows[0]);
}
module.exports = new ApplicationRepository();
