const express = require("express");
const router = express.Router();
const controllers  = require("../controllers")

router.get("/", (req, res, next) => res.send("my profile"));

router.post("/signup", controllers.createUser);

module.exports = router;
