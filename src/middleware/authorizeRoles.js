const userRepo = require("../repositories/userRepository");

module.exports = async (req, res, next) => {
  try {
    const userId = req.userId;
    const roleId = parseInt(req.params.roleId, 10);

    if (roleId < 0 || roleId > 5 || isNaN(roleId)) {
      const err = new Error("Invalid roleId");
      err.status = 400;
      return next(err);
    }

    const roles = await userRepo.getRolesByUserId(userId);

    const hasRole = roles.some((role) => role.role_id === parseInt(roleId) || role.role_id === 0);
    if (!hasRole) {
      const err = new Error("Insufficient privileges");
      err.status = 403;
      return next(err);
    }

    next();
  } catch (err) {
    err.status = err.status || 403;
    next(err);
  }
};
