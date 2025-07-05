const db = require("../models/db");

exports.userGet = async (req, res) => {
    const userID = req.params.userID;
    const { posts, user } = await db.getUserPosts(userID);

    const currentUser = req.user;
    res.render("userPosts", { posts, user, currentUser });
};
