const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/, "");
    if (!token) {
      const err = new Error("Missing Authorization header");
      err.status = 401;
      throw err;
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    error.status = error.status || 401;
    next(error);
  }
};
