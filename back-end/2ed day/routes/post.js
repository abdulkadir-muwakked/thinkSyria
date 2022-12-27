const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")


router.get("/", postController.getALlPosts)
router.post("/", postController.createPost)
router.put("/:id", postController.updatePost)
router.get("/:id", postController.getSinglePost)
router.delete("/:id", postController.deletePost)
//router.get("/deletePost", postController.getDeletePostx)




module.exports = router