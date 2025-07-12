const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_CONNECTION_STRING;
const db = new Pool({
    connectionString: connectionString,
});

exports.checkIfEmailExists = async (email) => {
    const userEmails = await db.query("SELECT * FROM users");
    console.log(userEmails.rows);
};
exports.checkIfNameExists = (userName) => {
    const userIdList = "";
};

exports.createAccount = async (req) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.query(
            "insert into users (first_name, last_name, email, password, membership_status) values ($1, $2, $3, $4, 'activated')",
            [
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                hashedPassword,
            ]
        );
    } catch (error) {
        console.error(error);
    }
};

exports.getPosts = async () => {
    try {
        const posts = await db.query(
            "SELECT * FROM post JOIN users ON post.owner_id = users.id"
        );
        return posts.rows;
    } catch (error) {
        console.error(error);
    }
};

exports.getUserPosts = async (userID) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE id = $1", [
            userID,
        ]);
        const posts = await db.query("SELECT * FROM post WHERE owner_id = $1", [
            userID,
        ]);
        return { posts: posts.rows, user: user.rows[0] };
    } catch (error) {
        console.error(error);
    }
};

exports.makePost = async (req) => {
    const currentDate = new Date();

    try {
        await db.query(
            "insert into post (title, content, date_posted, owner_id) values ($1, $2, $3, $4)",
            [req.body.title, req.body.content, currentDate, req.user.id]
        );
    } catch (error) {
        console.error(error);
    }
};

exports.deletePost = async (id, userID) => {
    const result = await db.query("SELECT owner_id FROM post WHERE id = $1", [
        id,
    ]);
    const postUserID = result.rows[0].owner_id;

    if (postUserID === userID) {
        try {
            await db.query("DELETE FROM post WHERE id = $1", [id]).rows;
        } catch (error) {
            console.error(error);
        }
        return true;
    } else {
        return false;
    }
};
