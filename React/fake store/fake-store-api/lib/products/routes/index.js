const express = require("express")
const router = express.Router()
const controllers = require("../controllers")

router.get("/", controllers.getProducts) // Get  all products
router.get("/:id", controllers.getProduct) // Get single product
router.get("/category/:id", controllers.getProductByCategory) // Get products in a specific category



module.exports = router