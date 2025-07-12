const e = require("express");
const db = require("../models/db");

exports.newGet = (req, res) => {
    const message = "";
    let user = req.user;

    if (user) {
        res.render("newPost", { message, user });
    } else {
        res.status(401).send("Error 401, user not logged in");
    }
};

exports.newPost = async (req, res) => {
    let user = req.user;
    try {
        await db.makePost(req);
        res.render("newPost", { message: "Post created", user });
    } catch (error) {
        res.render("newPost", { message: "Failed to make post", user });
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    const user = req.user.id;
    result = await db.deletePost(postId, user);
    if (result) {
        res.redirect("/");
    } else {
        res.status(403).send("Error 403, not authorized");
    }
};
