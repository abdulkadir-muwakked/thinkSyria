const authService = require("../middleware/authService");
const responses = require("../helper/responses");
const models = require("../../models");

const isAuthenticated = async function (req, res, next) {
  try {
    // take out the jwt we've set in the cookie set or from auth headers coming from client
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if(!token) return responses.unauthenticated(res);
    const isInvalid = await models.Token.findOne({
      where: {
        token,
      },
    });
    if (isInvalid) return responses.failedWithMessage("Unauthenticated, token is invalid", res);
    const isVerified = await authService.verifyUser(req, res, next, token);
    if(!isVerified) return responses.unauthenticated(res);
    return next();
  } catch (err) {
    console.log("Error -->", err);
    return responses.unauthenticated(res);
  }
};

const isAdmin = async function (req, res, next) {
  try { 
    const user = await models.users.findByPk(req?.user?.id)  
    if (user?.type == "admin") return next()
    return responses.failedWithMessage("Unauthorized, need admin access", res)
  } catch (err) {
    console.log("Error -->", err);
    return responses.unauthenticated(res);
  }
};



module.exports = {
  isAuthenticated,
  isAdmin,
};
