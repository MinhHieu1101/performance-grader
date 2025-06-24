const userRepo = require("../repositories/userRepository");

module.exports = async (req, res, next) => {
  try {
    const user = await userRepo.findById(req.userId);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (!user.roles.find((r) => r.name === "admin")) {
      const err = new Error("Admin privileges required");
      err.status = 403;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
};
