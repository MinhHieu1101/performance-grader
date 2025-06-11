const bcrypt = require("bcryptjs");

const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pw, salt);
  return hashedPassword;
};

module.exports = { hashPassword };
