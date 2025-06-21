module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      const err = new Error("User not loaded");
      err.status = 500;
      return next(err);
    }

    if (!allowedRoles.includes(user.role)) {
      const err = new Error("Insufficient privileges");
      err.status = 403;
      return next(err);
    }

    next();
  };
};
