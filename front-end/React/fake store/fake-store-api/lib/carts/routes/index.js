const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controllers = require("../controllers")


router.post("/", middleware.isAuthenticated, controllers.addCart)
router.get("/", middleware.isAuthenticated, controllers.getCarts)
router.delete("/:id", middleware.isAuthenticated, controllers.deletedCart)


module.exports = router