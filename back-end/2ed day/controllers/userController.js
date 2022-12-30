const { json } = require("body-parser");
const thinksyria = require("../db");

const createUser = (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirmation = req.body.password_confirmation;
  const email = req.body.email;

  if (name?.length < 3)
    return res.send({
      sucess: false,
      meg: "name is invalid",
      data: []
    });
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return res.send({
      sucess: false,
      meg: "email is invalid",
      data: []
    });

  if (password?.length < 6)
    return res.send({
      sucess: false,
      meg: "password is invalid",
      data: []
    });

  if (password.localeCompare(passwordConfirmation))
    return res.send({
      sucess: false,
      meg: "password and  passwordConfirmation are not  matched !",
      data: []
    });

  thinksyria.query(
    `INSERT INTO users (username, email, password) VALUES ('${name}', '${email}', '${password}')`,
    (err, result) => {
      if (err) {
        return res.send({
          sucess: false,
          meg: err.message,
          data: []
        });
      }
      return res.send({
        sucess: true,
        meg: "your account has been created!",
        data: []
      });
    }
  );
};

const login = (req, res) => {
  const account = req.body.account;
  const password = req.body.password;
  if (!account && !password) {
    return res.send({
      sucess: false,
      meg: "username or email and password cant be empty !",
      data: []
    });
  }
  thinksyria.query(
    `SELECT * FROM users WHERE (username='${account}' OR email='${account}') AND (password='${password}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(201).send({
          sucess: false,
          meg: "check from you account email or account username and password !",
          data: []
        });
      }
      console.log(result);
      if (result?.length > 0) {
        return res.send({
          sucess: true,
          meg: "you are in !",
          data: [],
          token: {
            id: result[0]?.id,
            username: result[0]?.username,
            email: result[0]?.email
          }
        });
      }
      return res.status(401).send({
        sucess: false,
        meg: "check from you account email or account username and password !",
        data: []
      });
    }
  );
};

module.exports = {
  createUser,
  login
};
