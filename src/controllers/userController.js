const db = require("../config/knexInstance");
const { hashPassword } = require("../utils/hashPassword");


const userDetails = async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db("users")
      .insert({ username: name, email, password: hashedPassword })
      .returning(["user_id", "username", "email"]);

    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  userDetails,
  addUser
};