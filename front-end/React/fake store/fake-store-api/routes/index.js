const  express = require('express');
const router = express.Router();


router.use("/users", require("../lib/users/routes"));
router.use("/products", require("../lib/products/routes"));
router.use("/carts", require("../lib/carts/routes"));
router.use("/categories", require("../lib/categories/routes"));

module.exports = router;
