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
