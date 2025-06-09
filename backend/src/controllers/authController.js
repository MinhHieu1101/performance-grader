const db = require("../config/knexInstance");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const { hashPassword } = require("../utils/hashPassword");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db("users")
      .insert({ name, email, password: hashedPassword })
      .returning(["id", "name", "email"]);

    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account found with this email" });
    }

    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production", // only secure in production
        maxAge: 24 * 60 * 60 * 1000, // 1d
        /* maxAge: 15 * 60 * 1000, // 15 minutes */
      });
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
