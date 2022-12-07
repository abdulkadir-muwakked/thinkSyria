const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authService = {
  signUser: (user) => {
    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
        username: user?.username,
        type: user?.type
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10h"
      }
    );
    return token;
  },
  verifyUser: (req, res, next, token) => {
    if (!token) return false;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      // set the user data to the req obj using the decoded token payload
      req.user = {
        id: decoded?.id,
        email: decoded?.email,
        type: decoded?.type,
        token: token
      };
      return decoded;
    }
  },
  hashPassword: (plainTextPassword) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
};

module.exports = authService;
