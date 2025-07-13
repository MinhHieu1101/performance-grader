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
}

module.exports = new UserController();
