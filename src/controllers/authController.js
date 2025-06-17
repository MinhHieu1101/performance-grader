const jwt = require("jsonwebtoken");
const AuthService = require("../services/authService");
const BaseController = require("./BaseController");

class AuthController extends BaseController {
  register = BaseController.handle(async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = await AuthService.register({
      username,
      email,
      password,
      role,
    });
    return this.sendSuccess(res, user, 201);
  });

  login = BaseController.handle(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login({
      email,
      password,
    });

    await authService.saveRefreshToken(user.user_id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return this.sendSuccess(res, { user, accessToken, refreshToken });
  });

  logout = BaseController.handle((req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    return this.sendSuccess(res, { message: "Logout successful" });
  });

  refresh = BaseController.handle(async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      const err = new Error("No refresh token");
      err.status = 401;
      throw err;
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (_) {
      const err = new Error("Invalid refresh token");
      err.status = 401;
      throw err;
    }

    const saved = await authService.getRefreshToken(payload.userId);
    if (saved !== token) {
      const err = new Error("Refresh token not recognized");
      err.status = 401;
      throw err;
    }

    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    return this.sendSuccess(res, { accessToken: newAccessToken });
  });
}

module.exports = new AuthController();
