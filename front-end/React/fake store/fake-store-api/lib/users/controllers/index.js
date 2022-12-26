const responses = require("../../helper/responses");
const services = require("../services");
const transformers = require("../../transformers");
const authService = require("../../middleware/authService");
const models = require("../../../models");

const signup = async (req, res) => {
  try {
    const { username, email, password, passwordConfirmation } = req?.body;
    if (!username || !email || !password)
      return responses.failedWithMessage("Fill all required fields.", res);
    if (username?.length < 3)
      return responses.failedWithMessage("username is invalid", res);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return responses.failedWithMessage("Please add a valid email", res);
    if (password?.length < 6)
      return responses.failedWithMessage("Please add a valid password", res);
    if (password.localeCompare(passwordConfirmation))
      return responses.failedWithMessage(
        "Your password and password confirmation do not match",
        res
      );
    const user = await services.createUser({
      username,
      email,
      password
    });
    if (user) {
      return responses.successWithMessage("User created successfully", res);
    }
    return responses.failedWithMessage("User already exists.", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

const signin = async (req, res) => {
  try {
    const { account, password } = req?.body;
    if (!account || !password)
      return responses.failedWithMessage(
        "Please fill in the required fields.",
        res
      );
    const result = await services.signin({ account, password });
    if (result) {
      return responses.success(
        "Logged in successfully",
        { ...transformers.userTransformer(result?.user), token: result.token },
        res
      );
    }
    return responses.failedWithMessage(
      "Wrong username or email or password",
      res
    );
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const currentUser = await services.getProfile(req?.user?.id);
    if (currentUser)
      return responses.success(
        "user found",
        transformers.userTransformer(currentUser),
        res
      );
    return responses.unauthenticated(res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};


const updateProfile = async (req, res, next) => {
  try {
    const { username, email, newPassword, password, passwordConfirmation } = req?.body;
    const userId = req?.user?.id
    if(userId) return responses.unauthorized(res)
    if (!username || !email || !password)
      return responses.failedWithMessage("Fill all required fields.", res);
    if (username?.length < 3)
      return responses.failedWithMessage("username is invalid", res);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return responses.failedWithMessage("Please add a valid email", res);
    if (password?.length < 6)
      return responses.failedWithMessage("Please add a valid password", res);
    if (password.localeCompare(passwordConfirmation))
      return responses.failedWithMessage(
        "Your password and password confirmation do not match",
        res
      );
    const currentUser = await models.User.findOne({
      where: {
        id: userId
      }
    })

    if(!authService.comparePasswords(password, currentUser?.password)) return responses.failedWithMessage("Sorry you can not update user profile !", res) 
    let  cryptedPassword = "";
    if(newPassword?.trim())
       cryptedPassword = authService.hashPassword(newPassword)
    else 
      cryptedPassword = password
    const updatedUser = await services.updateUser({ userId, username, email, cryptedPassword }) 
    if(updatedUser[0]) return responses.successWithMessage("your profile has been updated it successfully", res) 

  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
} 

module.exports = {
  signup,
  signin,
  getProfile,
  updateProfile
};
