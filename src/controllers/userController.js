const BaseController = require("./BaseController");

class UserController extends BaseController {
  getById = BaseController.handle((req, res) => {
    return this.sendSuccess(res, req.user);
  });
}

module.exports = new UserController();
