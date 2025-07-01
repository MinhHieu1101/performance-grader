const { db } = require("../config");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.userTable = "users";
    this.roleTable = "roles";
    this.departmentTable = "departments";
    this.userRolesTable = "user_roles";
  }

  findByEmail = async (email) => db(this.userTable).where({ email }).first();

  findById = async (userId) => {
    const user = await db(this.userTable)
      .select("user_id", "username", "email", "created_at")
      .where({ user_id: userId })
      .first();

    if (!user) return null;

    // NEED TO verify and define roles HERE
    /* const roles = await db(this.roleTable)
      .select("role_id", "department_id")
      .join(
        this.userRolesTable,
        `${this.roleTable}.role_id`,
        "=",
        `${this.userRolesTable}.role_id`
      )
      .select(`${this.roleTable}.role_id`, `${this.roleTable}.name`)
      .where({ [`${this.userRolesTable}.user_id`]: userId }); */
    
    // only get the roles for now
    const roles = await db(this.roleTable)
      .select("role_id", "name");

    return { ...user, roles };
  };

  // DEAL WITH departments later
  create = async ({ username, email, password, roles }) => {
    const userId = uuidv4();

    return db.transaction(async (trx) => {
      await trx(this.userTable).insert({
        user_id: userId,
        username,
        email,
        password,
      });

      const roleIds = [];
      for (const roleName of roles) {
        let role = await trx(this.roleTable)
          .select("role_id")
          .where({ name: roleName })
          .first();

        /* if (!role) {
          const [newRole] = await trx(this.roleTable)
            .insert({ name: roleName })
            .returning(["role_id"]);
          role = newRole;
        } */

        roleIds.push(role.role_id);
      }

      const userRolesInserts = roleIds.map((roleId) => ({
        user_id: userId,
        role_id: roleId,
      }));
      await trx(this.userRolesTable).insert(userRolesInserts);

      const createdUser = await trx(this.userTable)
        .select("user_id", "username", "email", "created_at")
        .where({ user_id: userId })
        .first();

      const assignedRoles = await trx(this.roleTable)
        .select("role_id", "name")
        .whereIn("role_id", roleIds);

      return { ...createdUser, roles: assignedRoles };
    });
  };
}

module.exports = new UserRepository();
