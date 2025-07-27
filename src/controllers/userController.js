const BaseController = require("./BaseController");
const userService = require("../services/userService");

class UserController extends BaseController {
  // GET /users/me
  getMe = BaseController.handle(async (req, res) => {
    const user = await userService.getProfile(req.userId);
    return this.sendSuccess(res, user);
  });

  // GET /users/:id
  getById = BaseController.handle(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getProfile(id);
    return this.sendSuccess(res, user);
  });

  // POST /users/register
  register = BaseController.handle(async (req, res) => {
    const { username, email, password, phone_number } = req.body;
    const user = await userService.register({
      username,
      email,
      password,
      phone_number,
    });
    return this.sendSuccess(res, user, 201);
  });

  // PATCH /users/:userId/role
  updateRole = BaseController.handle(async (req, res) => {
    const { id } = req.params;
    const { roleId, department } = req.body;

    if (!roleId) {
      const err = new Error("Role ID is required");
      err.status = 400;
      throw err;
    }

    const updated = await userService.updateUserRole({
      userId: id,
      newRoleId: Number(roleId),
      newDepartment: department,
    });

    return this.sendSuccess(
      res,
      updated,
      200,
      `New role has been assigned to user ${id}`,
    );
  });
}

module.exports = new UserController();
