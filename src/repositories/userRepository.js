const { db } = require("../config");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.userTable = "users";
    this.roleTable = "roles";
    this.userRolesTable = "user_roles";
  }

  findByEmail = async (email) => db(this.userTable).where({ email }).first();

  findById = async (userId) => {
    const user = await db(this.userTable)
      .select("user_id", "username", "email", "created_at")
      .where({ user_id: userId })
      .first();

    if (!user) return null;

    const roles = await db({ r: this.roleTable })
      .select(
        "r.role_id as role_id",
        "r.description as name",
        "r.department as department"
      )
      .join({ ur: this.userRolesTable }, "r.role_id", "ur.role_id")
      .where("ur.user_id", userId);

    return { ...user, roles };
  };

  create = async ({ username, email, password }) => {
    const userId = uuidv4();

    return db.transaction(async (trx) => {
      await trx(this.userTable).insert({
        user_id: userId,
        username,
        email,
        password,
      });

      const defaultRole = await trx(this.roleTable)
        .select("role_id", "name", "description", "department")
        .where({ name: "canhan" })
        .first();

      await trx(this.userRolesTable).insert({
        user_id: userId,
        role_id: defaultRole.role_id,
      });

      const createdUser = await trx(this.userTable)
        .select("user_id", "username", "email", "created_at")
        .where({ user_id: userId })
        .first();

      const assignedRoles = {
        role_id: defaultRole.role_id,
        name: defaultRole.description,
        department: defaultRole.department,
      };

      return { ...createdUser, roles: assignedRoles };
    });
  };
}

module.exports = new UserRepository();
