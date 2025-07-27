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
      .select("user_id", "username", "email", "phone_number", "created_at")
      .where({ user_id: userId })
      .first();

    if (!user) return null;

    const roles = await db({ r: this.roleTable })
      .select(
        "r.role_id as role_id",
        "r.description as name",
        "ur.department as department"
      )
      .join({ ur: this.userRolesTable }, "r.role_id", "ur.role_id")
      .where("ur.user_id", userId);

    return { ...user, roles };
  };

  create = async ({ username, email, password, phone_number }) => {
    const userId = uuidv4();

    return db.transaction(async (trx) => {
      await trx(this.userTable).insert({
        user_id: userId,
        username,
        email,
        password,
        phone_number,
      });

      const defaultRole = await trx(this.roleTable)
        .select("role_id", "name", "description")
        .where({ role_id: 1 })
        .first();

      const existingUserRole = await trx(this.userRolesTable)
        .where({ user_id: userId, role_id: defaultRole.role_id })
        .first();

      if (!existingUserRole) {
        await trx(this.userRolesTable).insert({
          user_id: userId,
          role_id: defaultRole.role_id,
        });
      }

      const createdUser = await trx(this.userTable)
        .select("user_id", "username", "email", "phone_number", "created_at")
        .where({ user_id: userId })
        .first();

      const assignedRoles = {
        role_id: defaultRole.role_id,
        name: defaultRole.description,
      };

      return { ...createdUser, roles: assignedRoles };
    });
  };

  getRolesByUserId = async (userId) => {
    const roles = await db({ r: this.roleTable })
      .select(
        "r.role_id as role_id",
        "r.description as name",
        "ur.department as department"
      )
      .join({ ur: this.userRolesTable }, "r.role_id", "ur.role_id")
      .where("ur.user_id", userId);

    return roles;
  };

  updateRoleByUserId = async ({ userId, role_id, department }) => {
    return db.transaction(async (trx) => {
      const insertData = {
        user_id: userId,
        role_id: role_id,
      };
      if (department !== undefined) {
        insertData.department = department;
      }

      await trx(this.userRolesTable).insert(insertData);

      const newAssignedRole = await trx(this.roleTable)
        .select("role_id", "name", "description")
        .where({ role_id })
        .first();
      return newAssignedRole;
    });
  };
}

module.exports = new UserRepository();
