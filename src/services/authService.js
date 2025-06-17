const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");

class AuthService {
  register = async ({ username, email, password, role }) => {
    const existing = await userRepo.findByEmail(email);
    if (existing) {
      const err = new Error("Email already in use");
      err.status = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userRepo.create({
      username,
      email,
      password: hash,
      role,
    });
    return user;
  };

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
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { userId: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    return { user, accessToken, refreshToken };
  };

  saveRefreshToken = async (userId, token) => {
    return db("refresh_tokens")
      .insert({ user_id: userId, token })
      .onConflict("user_id")
      .merge();
  };

  getRefreshToken = async (userId) => {
    const row = await db("refresh_tokens")
      .select("token")
      .where({ user_id: userId })
      .first();
    return row?.token;
  };
}

module.exports = new AuthService();
