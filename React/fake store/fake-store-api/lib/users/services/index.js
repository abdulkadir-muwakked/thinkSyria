const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/authService");

const createUser = async ({ username, email, password }) => {
  try {
    const userType = await models.UserType.findOne({ where: { type: "user" } });
    if (!userType) return null;
    const [user, userCreated] = await models.User.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ username }, { email }] }, { deletedAt: null }]
      },
      defaults: {
        username,
        email,
        password: authService.hashPassword(password),
        avatar:
          "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67",
        userTypeId: userType?.id
      }
    });
    if (!userCreated) return null;
    return user;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const signin = async ({ account, password }) => {
  try {
    const user = await models.User.findOne({
      where: {
        [Op.and]: [
          {
            [Op.or]: [{ username: account }, { email: account }],
            deletedAt: null
          }
        ]
      },
      include: { model: models.UserType, as: "Type" }
    });
    if (user) {
      if (authService.comparePasswords(password, user.password))
        return { user, token: authService.signUser(user) };
      else return null;
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const getProfile = async (id) => {
  try {
    const result = await models.User.findOne({
      where: {
        id
      },
      include: [{ model: models.UserType, as: "Type" }]
    });
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const updateUser = async ({ userId: id, username, email, cryptedPassword }) => {
  try {
    const update = await models.User.update(
      {
        username,
        email,
        password: cryptedPassword
      },
      {
        where: {
          id
        }
      }
    );
    return update
  } catch (err) {
    console.error(e);
    throw new Error(e);
  }
};

const logout = async ({ token }) => {
  [result, created] = await models.invalidTokens.findOrCreate({
    where: {
      token
    },
    defaults: {
      tokens: token
    }
  });
  if (!created) return false;
  return result;
};

module.exports = {
  createUser,
  signin,
  getProfile,
  updateUser,
  logout
};
