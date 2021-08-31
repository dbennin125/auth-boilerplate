const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ userName, email, password, photoURL }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({ userName, email, passwordHash, photoURL });
    return user;
  }

  static authToken(user) {
    return jwt.sign({ user }, process.env.APP_SECRET);
  }

  static verifyAuthToken(token) {
    const { user } = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }
};
