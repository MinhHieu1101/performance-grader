module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    const roleNames = user.roles.map(r => r.name);
    if (!allowedRoles.some((role) => roleNames.includes(role))) {
      const err = new Error("Insufficient privileges");
      err.status = 403;
      return next(err);
    }

    next();
  };
};
