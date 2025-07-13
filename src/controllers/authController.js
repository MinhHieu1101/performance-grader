const jwt = require("jsonwebtoken");
const AuthService = require("../services/authService");
const BaseController = require("./BaseController");

class AuthController extends BaseController {
  login = BaseController.handle(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 5184000000, // 60 days in ms
    });

    return this.sendSuccess(res, { user, accessToken, refreshToken });
  });

  logout = BaseController.handle(async (req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return this.sendSuccess(res, { message: "Logout successful" });
  });
}

module.exports = new AuthController();
