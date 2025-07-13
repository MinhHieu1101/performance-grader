const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../config");
const userRepo = require("../repositories/userRepository");

class AuthService {
  login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 400;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Invalid credentials");
      err.status = 400;
      throw err;
    }

    const accessToken = jwt.sign(
      { userId: user.user_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const refreshToken = jwt.sign(
      { userId: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "60d" }
    );

    return { user, accessToken, refreshToken };
  };
}

module.exports = new AuthService();
