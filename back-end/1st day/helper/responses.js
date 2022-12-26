const responseMessage = require("./responseMessage");

const serverError = (res) => {
  return res.status(500).send(responseMessage.errorResponse("sever Error !"));
};

const success = (res, msg, data = []) => {
  return res.status(200).send(responseMessage.successResponse(msg, data));
};

const failedWithMessage = (res, msg) => {
  return res.status(200).send(responseMessage.errorResponse(msg));
};

module.exports = {
  serverError,
  success,
  failedWithMessage
};
