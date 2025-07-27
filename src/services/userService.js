const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");

class UserService {
  register = async ({ username, email, password, phone_number }) => {
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
      phone_number,
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

  getProfile = async (userId) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    return user;
  };

  updateUserRole = async ({ userId, newRoleId, newDepartment }) => {
    const allowedRoles = [0, 1, 2, 3, 4, 5];

    if (!allowedRoles.includes(newRoleId)) {
      const err = new Error(`Role ${newRoleId} not found`);
      err.status = 404;
      throw err;
    }

    const updatingUser = await userRepo.findById(userId);
    if (!updatingUser) {
      const err = new Error(`User not found`);
      err.status = 404;
      throw err;
    }

    const hasRole = updatingUser.roles.some(
      (role) => role.role_id === newRoleId
    );
    if (hasRole) {
      const err = new Error(
        `Role ${newRoleId} is already assigned to this user`
      );
      err.status = 404;
      throw err;
    }

    const updated = await userRepo.updateRoleByUserId({
      userId,
      role_id: newRoleId,
      department: newDepartment,
    });

    if (!updated) {
      const err = new Error(`No existing role assignment for user ${userId}`);
      err.status = 404;
      throw err;
    }

    return updated;
  };
}

module.exports = new UserService();
