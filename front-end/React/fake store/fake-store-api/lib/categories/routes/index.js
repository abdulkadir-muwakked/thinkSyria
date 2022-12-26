const express =  require("express")
const router = express.Router()
const controllers = require("../controllers")


router.get("/", controllers.getCategories)


module.exports = router
