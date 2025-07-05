const { Router } = require("express");
const postController = require("../controllers/userController");
const postRouter = Router();

userRouter.get("/new", userController.newGet);
userRouter.post("/new", userController.newPost);

module.exports = userRouter;
