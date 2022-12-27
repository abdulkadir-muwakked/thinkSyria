const data = [
  {
    id: +Math.random() * 100,
    username: "ali",
    email: "ali@gmail.com",
    password: "123456"
  }
];

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
    })
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
    })
  
    if (password?.length < 6)
    return res.send({
        sucess: false,
        meg: "password is invalid",
        data: []
    })
  
    if (password.localeCompare(passwordConfirmation))
    return res.send({
        sucess: false,
        meg: "password and  passwordConfirmation are not  matched !",
        data: []
    })

    while(true){
        const uniqeId = +Math.random() * 100
        const user = data.find(user => user.id == uniqeId)
        if(!user) {
            data.push({
                id: uniqeId,
                username, 
                password,
                email
            })
            break
        }
    }
    return res.send({
        sucess: true,
        meg: "",
        data: data[data.length - 1]
    })
};

module.exports = {
  createUser
};
