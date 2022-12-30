const express = require("express")
const router = express.Router()
const controllers = require("../controllers/userController")

router.post("/", controllers.createUser)
router.post("/login", controllers.login)
//router.post("/me", controllers.getUserId)




module.exports = router