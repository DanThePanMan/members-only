const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/new", postController.newGet);
postRouter.post("/new", postController.newPost);
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;
