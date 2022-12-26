const response = require("../../helper/responses");


const createUser = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirmation = req.body.password_confirmation;
  const email = req.body.email;

  if (name?.length < 3)
    return response.failedWithMessage(res, "name is invaild !");
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return response.failedWithMessage(res, "email is invaild !");

  if (password?.length < 6)
    return response.failedWithMessage(res, "password is invaild !");

  if (password.localeCompare(passwordConfirmation))
    return response.failedWithMessage(
      res,
      "password  and  passwordConfirmation are not  matched !"
    );

  return response.success(res, "registered it !");
};


module.exports = {
    createUser
}