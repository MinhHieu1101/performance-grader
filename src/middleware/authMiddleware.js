const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const accessToken = authHeader.replace(/^Bearer\s+/, "");

    let payload;
    if (accessToken) {
      try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = payload.userId;
        req.accessToken = accessToken;
        return next();
      } catch (err) {
        // Access token invalid, try refresh token from cookie
      }
    }

    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      try {
        const refreshPayload = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
          { userId: refreshPayload.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "7d" }
        );
        req.userId = refreshPayload.userId;
        req.accessToken = newAccessToken;

        res.setHeader("x-access-token", newAccessToken);
        res.setHeader("Authorization", "Bearer " + newAccessToken);
        return next();
      } catch (err) {
        const error = new Error("Session expired. Please log in again.");
        error.status = 401;
        return next(error);
      }
    }

    // No valid token found
    const error = new Error(
      "Missing or invalid authentication. Please log in."
    );
    error.status = 401;
    return next(error);
  } catch (error) {
    error.status = error.status || 401;
    next(error);
  }
};
