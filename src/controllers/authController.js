const { validationResult } = require("express-validator");
const db = require("../models/db");
const passport = require("passport");
require("../util/passportUtils")(passport);

exports.registerGet = (req, res) => {
    res.render("register", { message: "" });
};

exports.registerPost = async (req, res) => {
    const errors = validationResult(req);

    if (req.body.password != req.body.confirmPassword) {
        return res.render("register", {
            message: "Passwords must be the same",
        });
    }
    if (req.body.secret != "garlicSalt") {
        return res.render("register", {
            message: "Incorrect secret",
        });
    }
    if (!errors.isEmpty()) {
        return res.render("register", {
            message: errors
                .array()
                .map((err) => err.msg)
                .join(", "),
        });
    } else {
        await db.createAccount(req);
        res.redirect("/");
    }
};

exports.loginGet = (req, res) => {
    res.render("login", { message: "" });
};

exports.loginPost = (req, res, next) => {
    const errors = validationResult(req);
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/fail",
    })(req, res, next);
    if (!errors.isEmpty()) {
        return res.render("login", {
            message: errors
                .array()
                .map((err) => err.msg)
                .join(", "),
        });
    }
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
