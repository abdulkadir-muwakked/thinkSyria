const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../../middleware");
const multer = require("multer")
const upload = multer()

router.post("/signup", controllers.signup); 
router.post("/signin", controllers.signin);
router.get("/", middleware.isAuthenticated, controllers.getProfile);
router.put("/", middleware.isAuthenticated, controllers.updateProfile);


module.exports = router;