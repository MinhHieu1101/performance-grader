const userRepo = require("../repositories/userRepository");

module.exports = async (req, res, next) => {
  try {
    const id = req.userId || req.params.userId;
    if (!id) {
      const err = new Error("No userId provided");
      err.status = 400;
      throw err;
    }

    const user = await userRepo.findById(id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
