const { db } = require("../config/knexInstance");

class UserRepository {
  constructor() {
    this.table = "users";
  }

  findByEmail = async (email) => db(this.table).where({ email }).first();

  findById = async (id) =>
    db(this.table)
      .select("user_id", "username", "email", "role", "is_active")
      .where({ user_id: id })
      .first();

  create = async ({ username, email, password, role }) =>
    db(this.table)
      .insert({ username, email, password: password, role })
      .returning(["user_id", "username", "email", "role"])
      .then((rows) => rows[0]);
}

module.exports = new UserRepository();
