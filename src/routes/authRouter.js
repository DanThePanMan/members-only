const { Router } = require("express");
const authController = require("../controllers/authController");
const authRouter = Router();
const { body, validationResult } = require("express-validator");

authRouter.get(
    "/register",

    authController.registerGet
);
authRouter.post(
    "/register",
    [
        body("name")
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
            .withMessage("Password must be at least 6 characters")
            .escape(),
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
            .escape(), // escape special characters
    ],
    authController.loginPost
);

module.exports = authRouter;
