const { Router } = require("express");
const authController = require("../controllers/authController");
const authRouter = Router();
const { body } = require("express-validator");

authRouter.get(
    "/register",

    authController.registerGet
);
authRouter.post(
    "/register",
    [
        body("first_name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long")
            .escape(),
        body("last_name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long")
            .escape(),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),

        body("password")
            .trim()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("secret").trim().escape(),
    ],
    authController.registerPost
);

authRouter.get("/login", authController.loginGet);
authRouter.post(
    "/login",
    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),
        body("password")
            .trim()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
            .escape(),
    ],
    authController.loginPost
);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
