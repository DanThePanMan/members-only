const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/:userID", userController.userGet);

module.exports = userRouter;
