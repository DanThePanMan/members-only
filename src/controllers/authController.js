const { validationResult } = require("express-validator");

exports.registerGet = (req, res) => {
    res.render("register", { message: "" });
};

exports.registerPost = (req, res) => {
    const errors = validationResult(req);
    if (req.password === req.confirmPassword) {
        return res.render("register", {
            message: "Passwords must be the same",
        });
    }
    if (!errors.isEmpty()) {
        return res.render("register", {
            message: errors
                .array()
                .map((err) => err.msg)
                .join(", "),
        });
        //now for database side actions
    }

    const { name, email, password, secret } = req.body;

    res.redirect("/");
};

exports.loginGet = (req, res) => {
    res.render("login", { message: "" });
};

exports.loginPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("login", {
            message: errors
                .array()
                .map((err) => err.msg)
                .join(", "),
        });
    }

    const { name, email, password, secret } = req.body;
    // Proceed with registration logic
    res.send("login successful");
    console.log(req.body);
};
