const jwt = require("jsonwebtoken");
const db = require("../config/knexInstance");
const { generateAccessToken } = require("../utils/generateTokens");
require("dotenv").config();

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  if (!accessToken) {
    const err = new Error("Not Authorized. Invalid access token.");
    err.status = 401;
    throw err;
  }

  try {
    const decodedAccess = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await db("users")
      .select("userId", "username", "email", "role")
      .where("userId", decodedAccess.userId)
      .first();
    req.user = user;
    return next();
  } catch (err) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const err = new Error("Refresh token missing. Please log in again.");
      err.status = 401;
      throw err;
    }

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const newAccessToken = generateAccessToken(decodedRefresh.userId);
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      req.user = await db("users")
        .select("userId", "username", "email", "role")
        .where("userId", decodedRefresh.userId)
        .first();
      return next();
    } catch (error) {
      const err = new Error("Refresh token expired. Please log in.");
      err.status = 403;
      throw err;
    }
  }
};

module.exports = protect;
